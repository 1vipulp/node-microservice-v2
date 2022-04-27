const { connection } = require("./../../db");

async function insert(tableName, insertObj, replace = false) {
	return new Promise(async (resolve, reject) => {
		try {
			let keys;
			let values;
			let placeholders;
			const placeholderValues = [];
			{
				keys = `(${Object.keys(insertObj).join(",")})`;
				values = Object.values(insertObj);
				placeholders = `(${values.map((v, index) => "?").join(", ")})`;
				placeholderValues.push(...values);
			}
			const sql = !replace
				? `INSERT INTO ${tableName} ${keys} VALUES ${placeholders}`
				: `REPLACE INTO ${tableName} ${keys} VALUES ${placeholders}`;

			const query = connection.query(
				sql,
				placeholderValues,
				function (err, result) {
					if (err || !result) {
						console.log(`Error while inserting data for query ${query}`, err);
						reject(err);
					}
					resolve(result);
				}
			);
		} catch (error) {
			console.log(
				`Error while inserting data into ${tableName} with data ${JSON.stringify(
					insertObj
				)}`,
				error
			);
			reject(error);
		}
	});
}
async function update(tableName, condition, updateObj) {
	return new Promise(async (resolve, reject) => {
		try {
			const values = [];
			const { conditionKeys: setDoc, conditionValues: setValues } =
				makeUpdateCondition(updateObj);
			values.push(...setValues);
			const { conditionKeys, conditionValues } = makeUpdateCondition(
				condition,
				true
			);
			values.push(...conditionValues);
			const sql = `UPDATE ${tableName} SET ${setDoc} WHERE ${conditionKeys}`;
			connection.query(sql, values, function (err, result) {
				if (err) {
					console.log({ err });
					reject(err);
				}
				resolve(result);
			});
		} catch (error) {
			console.log({ error });
			reject(error);
		}
	});
}
function makeUpdateCondition(condition, addSeperator = false) {
	let conditionKeys = [];
	const conditionValues = [];

	Object.keys(condition).map((key, index) => {
		const value = condition[key];
		if (value === null || value === "NULL" || value === "null") {
			if (addSeperator) conditionKeys.push(`${key} IS NULL`);
			else {
				conditionKeys.push(`${key} = ?`);
				conditionValues.push(value);
			}
		} else if (typeof value === "object") {
			if (Array.isArray(value)) {
				conditionKeys.push(` ${key} IN (?)`);
				conditionValues.push(value);
			}
		} else {
			conditionKeys.push(`${key} = ?`);
			conditionValues.push(value);
		}
	});
	if (addSeperator) {
		conditionKeys = conditionKeys.join(" AND ");
	}

	return { conditionKeys, conditionValues };
}
module.exports = {
	insert,
	update,
};

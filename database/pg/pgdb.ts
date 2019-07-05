const humps = require("humps");
const _ = require('lodash');
const { orderedFor, slug } = require("../../util/util");

class PgQueries {
    pgPool: any;
    constructor(pgPool: any) {
        this.pgPool = pgPool;
    }
    getUserByIds(userIds: [Number]): Promise<any> {
        return this.pgPool.query(`select * from auth_user
            where id=ANY($1)`, [userIds]).then((res: any) => {
            return orderedFor(res.rows, userIds, 'id', true)
        })
    }

    getUserByEmail(email: String): Promise<any> {
        return this.pgPool.query(`select * from auth_user
            where email=$1`, [email]).then((res: any) => {
            return humps.camelizeKeys(res.rows)
        })
    }

    addUser(username: String, email: String, password: String): Promise<any> {
        return this.pgPool.query(`insert into auth_user(username, email,
             password,is_superuser,first_name,last_name,is_staff,is_active,date_joined)
            values($1,$2,$3,$4,$5,$6,$7,$8,$9)
            returning *`, [username, email, password, false, '', '', false, true, new Date()]).then((res: any) => {
            return humps.camelizeKeys(res.rows[0])
        })
    }
}


export default PgQueries;
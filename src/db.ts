import {Pool} from "pg"

const connectionString ='postgres://yeqnvukb:4Q4AliYzURDhDLhEkY7DH2XulQXctR51@kesavan.db.elephantsql.com/yeqnvukb'

const db = new Pool({
    connectionString

})

export = db;
import sql from 'mssql';

const dbSettings = {
    user: 'sa',
    password: 'yourStrong#Password',
    server: 'localhost',
    database: 'MarvelApp',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
};

const poolPromise = new sql.ConnectionPool(dbSettings)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));


export { sql, poolPromise };

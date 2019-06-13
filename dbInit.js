const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    operatorsAliases: false,
    storage: 'database.sqlite',
});

const CurrencyShop = sequelize.import('models/CurrencyShop');
sequelize.import('models/Users');
sequelize.import('models/UserItems');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
    const shop = [
        CurrencyShop.upsert({ name: 'Cup of air', cost: 1000 }),
        CurrencyShop.upsert({ name: 'Bottle of air', cost: 5000 }),
        CurrencyShop.upsert({ name: 'Barrel of air', cost: 10000 }),
        CurrencyShop.upsert({ name: 'Plane of air', cost: 100000}),

    ];
    await Promise.all(shop);
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);
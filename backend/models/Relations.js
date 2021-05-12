const City = require("./Citys");
const Country = require("./Countrys");
const Region = require("./Regions");


Country.hasMany(Region,{
    foreignKey:'contry_id'
});

City.belongsTo(Country,{
    foreignKey: 'city_id'
});

module.exports = { City,Country,Region};
Ext.define("Erems.model.Masterreward", {
  extend: "Ext.data.Model",
  alias: "model.masterrewardmodel",
  idProperty: "reward_id",
  fields: [
    { name: "reward_id", type: "int" },
    { name: "group_id", type: "int" },
    { name: "name", type: "string" },
    { name: "code", type: "string" },
  ],
});

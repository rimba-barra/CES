Ext.define("Erems.model.Purchaseletterrewardprosesdetail", {
  extend: "Ext.data.Model",
  alias: "model.purchaseletterrewardprosesdetailmodel",
  idProperty: "purchaseletter_reward_id",
  fields: [
    { name: "purchaseletter_id", type: "int" },


    ////////////////////////////////////////////////////////////

    { name: "reward_id", type: "int" },
    { name: "reward", type: "string" },
    { name: "group_name", type: "string" },
    { name: "group_id", type: "int" },
    { name: "amount", type: "float" },
    { name: "purchaseletter_reward_id", type: "int" },
    { name: "deleted", type: "boolean" },
    { name: "user_date_check", type: "date", dateFormat: "Y-m-d H:i:s.u" },
    { name: "user_date_proses", type: "date", dateFormat: "Y-m-d H:i:s.u" },
    { name: "addon", type: "date", dateFormat: "Y-m-d H:i:s.u" },
    { name: "user_check_name", type: "string" },
    { name: "user_proses_name", type: "string" },
    { name: "note", type: "string" },
    { name: "user_date_check_change", type: "int" },
    { name: "user_date_proses_change", type: "int" },
    { name: "nomor_im", type: "string" },
    { name: "tanggal_im", type: "date", dateFormat: "Y-m-d H:i:s.u" }
  ],
});

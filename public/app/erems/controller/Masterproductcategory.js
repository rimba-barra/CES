Ext.define('Erems.controller.Masterproductcategory', {
    extend: 'Erems.template.ControllerForMaster',
    alias: 'controller.Masterproductcategory',
    controllerName: 'masterproductcategory',
    fieldName: 'productcategory',
    bindPrefixName: 'Masterproductcategory',
    formxWinId: 'win-productcategorywinId',
    mainDataSave: function(mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        me.tools.iNeedYou(me).save();
        

    }
});
Ext.define('Hrd.controller.Alokasibiaya', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Alokasibiaya',
    controllerName: 'alokasibiaya',
    fieldName: 'alokasibiaya_id',
    formWidth: 600,
    bindPrefixName: 'Alokasibiaya',
    
    // added by Wulan Sari 2018.05.09
    afterDetailRequested: function(data, motherFunc) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();
        
        if(!g.getSelectedRecord()){
            motherFunc();
            return;
        }
        f.getForm().loadRecord(g.getSelectedRecord());
        //f.down("button[action=save]").setDisabled(false);
        motherFunc();
        return false;
    },
    
});
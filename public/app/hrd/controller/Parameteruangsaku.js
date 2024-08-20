Ext.define('Hrd.controller.Parameteruangsaku', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Parameteruangsaku',
    controllerName: 'parameteruangsaku',
    fieldName: 'parameteruangsaku_id',
    formWidth: 600,
    bindPrefixName: 'Parameteruangsaku',
  
    afterDetailRequested: function(data, motherFunc) {
        // data from mode_read : 'detail'
        // motherFunc : fungsi yang dilewatkan dari method gridSelectionChange di Controllerfdv
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        f.editedRow = g.getSelectedRow();
        me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
        if(!g.getSelectedRecord()){
            motherFunc();
            return;
        }
        f.getForm().loadRecord(g.getSelectedRecord());
        f.down("button[action=save]").setDisabled(false);
        motherFunc();
        return false;
    },
    fdarInit:function(){
       var me = this;
       me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea(data.group, me.getFormdata().down("[name=group_group_id]")).comboBox();

            }
        }).read('detail');
    },
    /*@return void */
   /* fdarInit:function(){
        var me = this;
        var f = me.getFormdata();
        f.setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea(data.group, f.down("[name=group_group_id]")).comboBox();
                f.setLoading(false);
            }
        }).read('detail');
    },
    */
});
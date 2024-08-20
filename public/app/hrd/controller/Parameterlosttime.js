Ext.define('Hrd.controller.Parameterlosttime', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Parameterlosttime',
    controllerName: 'parameterlosttime',
    fieldName: 'losttime_param_id',
    bindPrefixName: 'Parameterlosttime',
    formWidth: 500,
    runFuncBeforeLoadGridData:true, // set true jika ada data combobox yg diload sebelum data grid keload
    localStore: {
        newdetail: null
    },
    init: function(config) {
       this.callParent(arguments);


    },
    addNewRecord:function(){
        return true;
    },
    panelAfterRender: function(el) {
        var me = this;
        me.callParent(arguments);
        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
        
        
        
        
        // maximize panel window

    },
    runFuncBLGD:function(store,func){
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait...");
        var f = me.getFormdata();
        me.tools.ajax({
            params:{},
            success: function(data, model) {
                me.tools.wesea(data.absenttype, f.down("[name=absenttype_absenttype_id]")).comboBox(false);
                p.setLoading(false);
                func(store);
                
            }
        }).read('detail');
    }
    
    

});
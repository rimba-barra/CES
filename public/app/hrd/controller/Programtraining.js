Ext.define('Hrd.controller.Programtraining', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Programtraining',
    controllerName: 'programtraining',
    fieldName: 'programtraining_id',
    bindPrefixName: 'Programtraining',
    formWidth: 500,
    localStore: {
        newdetail: null
    },
    init: function(config) {
        this.callParent(arguments);


    },
    panelAfterRender: function(el) {
        var me = this;
        me.callParent(arguments);
        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var p = me.getPanel();
        var f = me.getFormdata();
        p.setLoading("Loading...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea(data.grouptraining, f.down("[name=grouptraining_grouptraining_id]")).comboBox();
                p.setLoading(false);
            }
        }).read('detail');

        
        // maximize panel window

    },
    afterSC: function(rec) {
        var me = this;
        me.tools.formHelper(me.getFormdata()).fixMoneyFormat(rec);
    },
    finalData: function(data) {
       
        var me = this;
        data = me.tools.formHelper(me.getFormdata()).fixMoneyUnformat();
        return data;
    },
    addNewRecord: function() {
        return true;
    }



});
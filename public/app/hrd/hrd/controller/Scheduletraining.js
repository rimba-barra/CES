Ext.define('Hrd.controller.Scheduletraining', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Scheduletraining',
    controllerName: 'scheduletraining',
    fieldName: 'scheduletraining_id',
    bindPrefixName: 'Scheduletraining',
    formWidth: 500,
    localStore: {
        selectedProgram: null
    },
    init: function(config) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        newEvs['scheduletrainingformdata button[action=browse]'] = {
            click: me.browseProgram

        };
        newEvs['scheduletrainingprogramgrid button[action=select]'] = {
            click: me.selectProgram
        };
        this.control(newEvs);

    },
    browseProgram:function(el){
        var me = this;
        var browse = new Hrd.library.Box.Tools.Browse();
        browse.init({
            controller: me,
            view: 'ProgramGrid',
            el: el,
            localStore: "selectedProgram",
            mode_read: "program"
        });
        browse.showWindow();
    },
    selectProgram: function() {
        var me = this;
        var f = me.getFormdata();
        if (me.browseHandler) {
            me.browseHandler.selectItem(function() {
                var ps = me.localStore.selectedProgram; // purchaseletter detail Store
                var psRec = ps.getAt(0);
                if(psRec){
                    var d = psRec.data;
                    for(var i in d){
                        var el = f.down("[name=programtraining_"+i+"]");
                        if(el){
                            el.setValue(d[i]);
                        }
                    }
                    
                }


            });
        }
    },
    setUnReadOnlyFields:function(){
        var me = this;
        var undisableAr = ['code','theme','trainingtype','days','is_inhouse'];
        var f = me.getFormdata();
        for(var i in undisableAr){
            f.down("[name=programtraining_"+undisableAr[i]+"]").setReadOnly(true);
        }
    },
    addNewRecord: function() {
        var me = this;
        me.setUnReadOnlyFields();
        me.getFormdata().down("button[action=browse]").setDisabled(false);
        return true;
    },
    editOnClick: function() {
        var me = this;
        var f = me.getFormdata();
        me.tools.formHelper(f).readOnly(false);
        me.disableTBButtonsOnGrid(true);
        me.setUnReadOnlyFields();
        f.down("button[action=browse]").setDisabled(true);

    },
    



});
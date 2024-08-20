Ext.define('Hrd.controller.Shifttype', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Shifttype',
    controllerName: 'shifttype',
    fieldName: 'shifttype',
    formWidth: 600,
    bindPrefixName: 'Shifttype',
    init: function() {
        var me = this;
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        /* added 27 Agustus */
        var hourObjects = ['in_time','out_time','outafter_time'];
        for (var x in hourObjects) {
            this.control(events.timeInput('shifttypeformdata', me.tools.inputHoursObjects(hourObjects[x])));

        }
     
        
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        me.setActiveForm(f);

        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        if(data.others[0][0].project_id != 1 && data.others[0][0].project_id != 5096){
                            f.down('[name=is_teams]').setReadOnly(true);
                        }
                    }
                }).read('projectpt');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                       if(data.others[0][0].project_id != 1 && data.others[0][0].project_id != 5096){
                            f.down('[name=is_teams]').setReadOnly(true);
                        }
                    }
                }).read('projectpt');


                me.unMask(1);

            }
        };
        return x;
    },
});
Ext.define('Hrd.controller.Mtatatertib', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Mtatatertib',
    controllerName: 'mtatatertib',
    fieldName: 'disiplin_item',
    bindPrefixName: 'Mtatatertib',
    formWidth: 700,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    oldbobot:0,
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },
    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs = {};
        newEvs['mtatatertibgrid'] = {
            afterrender: function () {
                var me, gd, store;
                me = this;
                gd = me.getGrid();
                gd.doInit();
            },
        };
        newEvs['mtatatertibformdata'] = {
            boxready: function () {
                var me, form,state;
                me = this;
                form = me.getFormdata();
                state = form.up('window').state.toLowerCase();
                if(state=='update'){
                    me.oldbobot = form.down('[name=bobot]').getValue();
                }
            },
        };

        this.control(newEvs);
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);
        ;
        var x = {
            init: function () {

            },
            create: function () {
                me.unMask(1)
            },
            update: function () {
                me.unMask(1)
                var g = me.getGrid();
                var rec = g.getSelectedRecord();                
                if (rec) {
                    f.editedRow = g.getSelectedRow();
                    f.loadRecord(rec);
                }
            }
        };
        return x;
    },
    mainDataSave: function () {
        var me, f, formdata, g, s, row,percent,checkpercent,state,bobot;
        me = this;
        f = me.getFormdata();
        formdata = f.getForm();
        g = me.getGrid();
        s = g.getStore();
        row = f.editedRow;
        percent = parseFloat(s.sum('bobot'));        
        state = f.up('window').state.toLowerCase();


 	if(state=='create'){
            checkpercent = percent+parseFloat(f.down('[name=bobot]').getValue()); 
        }else{
            var calculate = (percent-parseFloat(me.oldbobot));  
            checkpercent = calculate+parseFloat(f.down('[name=bobot]').getValue());  
        }   

 
       
        if (checkpercent > 100) {
            me.buildWarningAlert('Data persentase sudah 100 persen..!');
        } else {
            if (formdata.isValid()) {
                me.insSave({
                    form: f,
                    grid: g,
                    finalData: function (data) {
                        return data;
                    },
                    sync: true,
                    callback: {
                        create: function (store, form, grid) {

                        }
                    }
                });

            }
        }
    },
    buildWarningAlert: function (msg) {
        Ext.Msg.show({
            title: 'WARNING',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.WARNING
        });
    },
});
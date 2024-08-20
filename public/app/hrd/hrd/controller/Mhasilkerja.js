Ext.define('Hrd.controller.Mhasilkerja', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Mhasilkerja',
    controllerName: 'mhasilkerja',
    fieldName: 'hasilkerja_item',
    bindPrefixName: 'Mhasilkerja',
    formWidth: 700,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
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
        newEvs['mhasilkerjagrid'] = {
            afterrender: function () {
                var me, gd, store;
                me = this;
                gd = me.getGrid();
                gd.doInit();
            },
        };
        newEvs['mhasilkerjaformdata'] = {
            boxready: function () {
                var me, form,state;
                me = this;
                form = me.getFormdata();
                state = form.up('window').state.toLowerCase();
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
        var me, f, formdata, g, s, row,total_bobot,state,bobot_old, bobot, record;
        me = this;
        f = me.getFormdata();
        formdata = f.getForm();
        g = me.getGrid();
        s = g.getStore();
        row = f.editedRow;   
        total_bobot = parseFloat(s.sum('bobot'));  
        state = f.up('window').state.toLowerCase();
		bobot = parseFloat(f.down('[name=bobot]').getValue());
		
 		if(state=='create'){
            total_bobot = total_bobot + bobot; 
			
        }else{
			record = s.getAt(row);			
			bobot_old = record.get('bobot');
			total_bobot = parseFloat(total_bobot) - parseFloat(bobot_old) + parseFloat(bobot);		
        }   
		
        if (total_bobot > 100) {
            me.buildWarningAlert("Bobot can't more than 100%");
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
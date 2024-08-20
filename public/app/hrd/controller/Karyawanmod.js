Ext.define('Hrd.controller.Karyawanmod', {
    extend: 'Hrd.template.ControllerForMasterDirect',
    alias: 'controller.Karyawanmod',
    controllerName: 'karyawanmod',
    fieldName: 'karyawanmod_id',
    formWidth: 600,
    bindPrefixName: 'Karyawanmod',
    refs:[
        {
            ref: 'gridlookupe',
            selector: 'lookupemployeegrid'
        },
    ],
    init: function() {
        var me = this;
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var events = new Hrd.library.box.tools.EventSelector();
        var newEvs = {};
        this.control(events.getEvents(me, me.controllerName));
        
        //lookup_employee
        newEvs['karyawanmodformdata button[action=lookup]'] = {
            click: function() {
                me.lookupEmployee();
            }

        };
        newEvs['#employeeKmodwindow lookupemployeegrid button[action=select]'] = {
            click: function() {
                me.selectEmployee();
            }

        };
        
        this.control(newEvs);
        
    },
    lookupEmployee: function() {
        var me = this;

        var window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeKmodwindow", "lookup.employee", {
            itemId: me.controllerName + 'employee'
        });


        var g = window.down("grid");


        var p = window.down("panel");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                p.setLoading(false);
            }
        }).read('employee');



    },
    selectEmployee: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGridlookupe();
        var rec = g.getSelectedRecord();
        if (rec) {
            f.down("[name=employee_employee_nik]").setValue(rec.get("employee_nik"));
            f.down("[name=employee_employee_name]").setValue(rec.get("employee_name"));
            f.down("[name=employee_employee_id]").setValue(rec.get("employee_id"));
            g.up("window").close();
        }

    },
    
});
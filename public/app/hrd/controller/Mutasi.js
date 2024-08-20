Ext.define('Hrd.controller.Mutasi', {
    extend: 'Hrd.library.box.controller.ControllerByData',
    alias: 'controller.Mutasi',
    requires: ['Hrd.library.box.tools.DefaultConfig', 'Hrd.library.box.tools.EventSelector',
        'Hrd.minic.lookup.Employee', 'Hrd.library.box.tools.ComboLoader', 'Hrd.library.box.tools.InstaView',
        'Hrd.library.box.tools.Hour'],
    views: [],
    comboBoxIdEl: [],
    controllerName: 'mutasi',
    formWidth: 600,
    refs: [
        {
            ref: 'gridlookuppersonal',
            selector: 'lookuppersonalgrid'
        },
        {
            ref: 'formsearhpersonal',
            selector: 'lookuppersonalformsearch'
        },
    ],
    //unitFormula: null,
    //storeProcess: 'Otherspaymentdatadetail',
    bindPrefixName: 'Mutasi',
    browseHandler: null,
    localStore: {
        selectedUnit: null,
    },
    textCombos: [],
    comboLoader: null,
    fieldName: 'changestatus_id',
    myParams: null,
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
        this.callParent(arguments);
        var newEvs = {};
        var events = new Hrd.library.box.tools.EventSelector();

        //lookup_employee
        newEvs['mutasiformdata button[action=lookup_employee]'] = {
            click: function () {
                me.lookupEmployee();
            }

        };
        newEvs['#employeeTMutasiwindow lookuppersonalgrid button[action=select]'] = {
            click: function () {
                me.selectEmployee();
            }

        };
        newEvs['#employeeTMutasiwindow lookuppersonalgrid'] = {
            afterrender: function () {
                var me, grid;
                me = this;
                grid = me.getGridlookuppersonal();
                grid.down("toolbar [action=select]").setText('Select Employee');
            }
        };
        this.control(newEvs);
    },
    selectEmployee: function () {
        var me, form, grid, record;
        me = this;
        form = me.getFormdata();
        grid = me.getGridlookuppersonal();
        record = grid.getSelectedRecord();
        if (record) {
            me.tools.fillEmployeeInfo(record, form);
            grid.up("window").close();
        }
    },
    lookupEmployee: function () {
        var me, window, grid, panel, paging;
        me = this;
        window = me.instantWindow("Panel", 600, "Employe List", "create", "employeeTMutasiwindow", "lookup.personal", {
            itemId: me.controllerName + 'employee'
        });

        grid = window.down("grid");
        panel = window.down("panel");
        grid.bindPrefixName = me.controllerName;
        grid.doInit();
        grid.doLoad({}, function () {
            paging = grid.down("pagingtoolbar");
            if (paging) {
                paging.getStore().loadPage(1);
            }
        });
    },
    panelAfterRender: function (el) {
        var me = this;

        if (me.isMaximize) {
            el.up("window").maximize();
        }
        me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

        var f = me.getFormdata();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.alokasibiaya, f.down("[name=new_costcenter1]")).comboBox();
                me.tools.wesea(data.alokasibiaya, f.down("[name=new_costcenter2]")).comboBox();
                me.tools.wesea(data.alokasibiaya, f.down("[name=new_costcenter3]")).comboBox();
                me.tools.wesea(data.project, f.down("[name=new_project_id]")).comboBox();
                me.tools.wesea(data.group, f.down("[name=new_group_id]")).comboBox();
                me.tools.wesea(data.department, f.down("[name=new_department_id]")).comboBox();
                me.tools.wesea(data.position, f.down("[name=new_position_id]")).comboBox();
            }
        }).read('parameter');

        me.getPanel().setLoading(false);

        // maximize panel window

    },
    validateData: function () {
        var me = this;
        var data = {"status": true, "msg": "Sedang diproses..."};

        return data;
    },
    afterClick: function () {
        var me = this;
        var f = me.getFormdata();
        var x = {
            cancel: function () {
                //  me.mainGridCheckRecord();
                // var rec = me.getGrid().getSelectedRecord();
                // if (rec) {
                //    f.loadRecord(rec);
                //}
            },
            save: function () {

            },
            edit: function () {

            },
            delete: function () {

            },
            new : function () {
                // me.validShift = false;
                f.getForm().reset();
                //  f.down("[name=date]").setValue(new Date());
            }
        }
        return x;
    }


});
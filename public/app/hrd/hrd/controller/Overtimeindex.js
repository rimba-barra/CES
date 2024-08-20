Ext.define('Hrd.controller.Overtimeindex', {
    extend: 'Hrd.library.box.controller.Controller2',
    alias: 'controller.Overtimeindex',
    controllerName: 'overtimeindex',
    fieldName: 'overtimeindex_id',
    bindPrefixName: 'Overtimeindex',
    formWidth: 500,
    runFuncBeforeLoadGridData: false, // set true jika ada data combobox yg diload sebelum data grid keload
    localStore: {
        newdetail: null
    },
    init: function(config) {
        this.callParent(arguments);
        var events = {};
        var me = this;
        events['overtimeindexgrid toolbar radiofield[name=overtimetype]'] = {
            change: function(a, b, c) {
                me.overtimeOnChange(a, b, c);
            }

        };
        this.control(events);

    },
    overtimeOnChange: function(el, checked) {
        var me = this;

        if (checked) {
            me.getFormdata().down("[name=overtimetype]").setValue(el.inputValue);
            me.overtimeGridFilter(el.inputValue);
        }
    },
    overtimeGridFilter: function(val) {
        var me = this;
        var s = me.getGrid().getStore();
        s.clearFilter(true);
        s.filterBy(function(rec, id) {

            if (rec.raw.overtimeindex.overtimetype === val) {
                return true;
            }
            else {
                return false;
            }
        });
    },
    afterClick: function() {
        var me = this;
        var x = {
            cancel: function() {

            },
            save: function() {

            },
            edit: function() {

            },
            delete: function() {

            },
            new : function() {
                var f = me.getFormdata();
                f.down("[name=overtimetype]").setValue(me.getGrid().down("[name=overtimetype]").getGroupValue());
            }
        }
        return x;
    },
    afterMainGridLoadedFunc: function() {
        var me = this;
        me.overtimeGridFilter(me.getGrid().down("[name=overtimetype]").getGroupValue());
    },
    storeLoadedAfterSaveUpdate:function(rec,operation,success){
        var me = this;
        me.overtimeGridFilter(me.getGrid().down("[name=overtimetype]").getGroupValue());
    },        
    addNewRecord: function() {
        return true;
    },
    ///  override this for load combobox before load data grid
    runFuncBLGD: function(func) {
    }



});



Ext.define('Hrd.controller.Department', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Department',
    controllerName: 'department',
    fieldName: 'department_id',
    fieldNameForDeleted: 'department', // add by wulan sari 20200806
    bindPrefixName: 'Department',
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
                        me.tools.wesea(data.employeeb, f.down("[name=manager_id]")).comboBox();

                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        me.tools.wesea(data.employeeb, f.down("[name=manager_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },
});
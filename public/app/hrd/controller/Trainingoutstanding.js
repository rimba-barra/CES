Ext.define('Hrd.controller.Trainingoutstanding', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingoutstanding',
    controllerName: 'trainingoutstanding',
    fieldName: 'name',
    bindPrefixName: 'Trainingoutstanding',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    refs:[
        {
            ref: 'gridtrans',
            selector: 'trainingoutstandingtransgrid'
        }
    ],
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        newEvs['trainingoutstandingformdata [name=periode]'] = {
            change: function() {
               me.totalCostPeriode();
            }
        };
        

        
        this.control(newEvs);
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gt = me.getGridtrans();
        me.setActiveForm(f);
        var rec_empid = g.getSelectedRecord();
        var employee_id = rec_empid.data['employee_id'];
        // console.log(rec.data['employee_id']);
        var x = {
            init: function() {
                me.fdarInit();
            },
            create: function() {
                me.unMask(1);
                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                    }
                }).read('getTransaction');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                        employee_id: employee_id
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                        // me.tools.wesea({data: data, model: model}, g).grid();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        // me.empExist();
                        console.log(rec.get('private'));
                    }
                }).read('getTransaction');


                me.unMask(1);

            }
        };
        return x;
    },
//     formViewOutstanding: function () {
//         var me = this;
//         var f = me.getFormdata();
//         var g = me.getGridtrans();
//         // var s = g.getStore();
//         var employee_id = f.down('[name=employee_id]').getValue();
// console.log(f.down());
//         me.tools.ajax({
//             params: {employee_id: employee_id},
//             success: function (data, model) {
//                 // console.log(data);
//                 // console.log(model);
//                 // me.tools.wesea({data: data, model: model}, g).grid();
//             }
//         }).read('getTransaction');
        
//     },
    totalCostPeriode: function(){
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var gt = me.getGridtrans();
        me.setActiveForm(f);
        var rec_empid = g.getSelectedRecord();
        var employee_id = rec_empid.data['employee_id'];
        var periode = f.down("[name=periode]").getValue();
        me.tools.ajax({
                    params: {
                        employee_id: employee_id,
                        periode    : periode
                    },
                    success: function(data, model) {
                        me.tools.wesea({data: data, model: model}, gt).grid();
                    }
                }).read('getTransactionFilter');

        me.tools.ajax({
                    params: {
                        employee_id: employee_id,
                        periode    : periode
                    },
                    success: function(data, model) {
                        var f = me.getFormdata();
                        
                        f.down("[name=total_cost]").setValue('');
                        f.down("[name=total_cost]").setValue(data.others[0][0].HASIL[1][0].total);
                    }
                }).read('getTransactionFilterTotal');
        
    },

});
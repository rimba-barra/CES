Ext.define('Hrd.controller.Leavecalculator', {
    extend: 'Hrd.library.box.controller.ControllerReport',
    alias: 'controller.leavecalculator',
    controllerName: 'leavecalculator',
    bindPrefixName: 'Leavecalculator',
    dateNow: new Date(),
    ParamRender:null,
    init: function (application) {
        this.callParent(arguments);
        var newEvs = {};
        var me = this;
        
        newEvs['leavecalculatorpanel'] = {
            boxready: function (el, val) {
                var me, f;
                me=this;
            }
        };
        
        newEvs['leavecalculatorpanel #leaveCalculatorFormID [name=employee_id]'] = {
            select: function (el, val) {
                me.getEmployee();
            }
        };
                
        this.control(newEvs);
    },
    zendInitLoaded: function (data) {
        var me = this;
        var f = me.getForm();
        
        me.tools.wesea(data.employeeb, f.down("[name=employee_id]")).comboBox();
        return;

    },
    processReport: function () {
        this.hitung();

    },
    getEmployee: function () {
        var me,params;
        me = this;
        me.tools.ajax({
            params: {
                'employee_id':me.getPanel().down("form").down('[name=employee_id]').getValue()
            },
            success: function (data, model) {
                 var data = data['others'][0][0][0];
                 var hire_date = data['hire_date'];
                 var rest = data['rest'];
                 var employeestatus_id = data['employeestatus_id'];
                 var group_code = data['group_code'];
                 me.getPanel().down("form").down('[name=hire_date]').setValue(hire_date);
                 me.getPanel().down("form").down('[name=rest]').setValue(rest);
                 me.getPanel().down("form").down('[name=employeestatus]').setValue(employeestatus_id);
                 if (group_code == 'xxx'){
                     group_code = 'Please Select';
                 }
                 me.getPanel().down("form").down('[name=group_code]').setValue(group_code);
            }
        }).read('employeedata')
    },
    hitung: function () {
        var me,params;
        me = this;
        var form = me.getPanel().down("form");
        
        //Ext.getCmp('loginForm').getForm().isValid()
        if(!form.getForm().isValid() || form.down('[name=group_code]').getValue() == 'Please Select'){
            Ext.Msg.alert('Warning', 'Hire Date, Group (Golongan), Resign Date, Rest is required'); 
            return false;
        }
                 
        var p = me.getPanel();
        p.setLoading("Please wait...");   
        me.tools.ajax({
            params: {
                'hire_date':form.down('[name=hire_date]').getValue(),
                'group_code':form.down('[name=group_code]').getValue(),
                'resign_date':form.down('[name=resign_date]').getValue(),
                'employeestatus':form.down('[name=employeestatus]').getGroupValue(),
                'rest':form.down('[name=rest]').getValue(),
                //added by anas 24102023
                'employee_id':form.down('[name=employee_id]').getValue()
            },
            success: function (data, model) {

                 var hasil = data['others'][0]['hasil'][0];
                 var total = hasil[0]['total'];
                 me.getPanel().down("form").down('[name=total]').setValue(total);
                
                //added by anas 24102023
                 var tabledetail = '<br/>Tabel detail cuti Karyawan <table border = 1 style="padding: 15px;">' + 
                '<tr style="text-align: center">'+
                    '<td>Tipe</td>'+
                    '<td>Tahun</td>'+
                    '<td>Hak Cuti</td>'+
                    '<td>Sisa Cuti</td>'+
                    '<td>Keterangan</td>'+
                '</tr>';

                var detail = data['others'][0]['detail'][0];
                for(var i = 0; i < detail.length; i++)
                {
                    tabledetail += '<tr>'+
                                    '<td style="white-space:normal; width:100px; padding: 5px;">'+detail[i]["Type"]+'</td>'+
                                    '<td style="white-space:normal; width:70px; padding: 5px;">'+detail[i]["tahun"]+'</td>'+
                                    '<td style="white-space:normal; width:80px; padding: 5px;">'+detail[i]["hak_cuti"]+'</td>'+
                                    '<td style="white-space:normal; width:80px; padding: 5px;">'+detail[i]["sisa_cuti"]+'</td>'+
                                    '<td style="white-space:normal; width:180px; padding: 5px;">'+detail[i]["keterangan"]+'</td>'+
                                '</tr>'
                }

                tabledetail += "</table>";

                 me.getPanel().down("form").down('[name=tabledetail]').setValue(tabledetail);
                 //end added by anas

                 p.setLoading(false);   
            }
        }).read('hitung')
    }
});
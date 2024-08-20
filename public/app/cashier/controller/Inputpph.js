Ext.define('Cashier.controller.Inputpph', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Inputpph',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectptcombobox',
        'Cashier.library.template.combobox.Coacombobox',
        'Cashier.library.template.combobox.Subaccountgroupcombobox',
        'Cashier.library.template.combobox.Subglcombobox',
        'Cashier.library.template.checkbox.CheckColumnInputpph',
        'Cashier.library.template.combobox.Vouchernocombobox'
    ],
    views: [
        'inputpph.Panel',
        'inputpph.Grid',
        'inputpph.FormData',
    ],
    stores: [
        'Inputpph',
        'Projectpt',
        'Coa',
        'Subaccountgroupfs',
        'Subgl',
        'Journal'
    ],
    models: [
        'Inputpph',
        'Projectpt',
        'Coa',
        'Subaccountgroup',
        'Subgl',
        'Journal'
    ],
    refs: [
        {ref: 'grid', selector: 'inputpphgrid'},
        {ref: 'panel', selector: 'inputpphpanel'},
        {ref: 'formdata', selector: 'inputpphformdata'},
        {ref: 'checkcolumninputpph', selector: 'checkcolumninputpph'}
    ],
    controllerName: 'inputpph',
    bindPrefixName: 'Inputpph',
    formWidth: 300,
    win: null,
    winId: null,
    init: function (application) {
        var me = this;
        this.control({
            'inputpphformdata': {
                afterrender: function() {
                    var me = this;
                    me.loadDataCombobox();
                    me.getGrid().getStore().removeAll();
                }
            },
            'inputpphformdata [name=projectpt_id]': {
                change: function() {
                    var me = this;
                    var f  = me.getFormdata();
                    var project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;
                    var pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;
                    me.loadDataCoa(project_id, pt_id);
                }
            },
            'inputpphformdata [name=coafrom]': {
                select: function(combo, records) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_from = combo.value;
                    var coa_id_to = f.down("[name=coato]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                },
                change: function(combo) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_from = combo.value;
                    var coa_id_to = f.down("[name=coato]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                },
                blur: function(combo) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_from = combo.value;
                    var coa_id_to = f.down("[name=coato]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                }
            },
            'inputpphformdata [name=coato]': {
                select: function(combo, records) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_to = combo.value;
                    var coa_id_from = f.down("[name=coafrom]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                },
                change: function(combo) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_to = combo.value;
                    var coa_id_from = f.down("[name=coafrom]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                },
                blur: function(combo) {
                    var me = this;
                    var f  = me.getFormdata();
                    var coa_id_to = combo.value;
                    var coa_id_from = f.down("[name=coafrom]").getValue();
                    me.loadDataKelsub(coa_id_from, coa_id_to);

                    me.loadDataVoucherNo();
                }
            },
            'inputpphformdata [name=kelsub_id]': {
                select: function(combo, records) {
                    var me = this;
                    var kelsub_id = combo.value;
                    me.loadDataSubgl(kelsub_id);

                    me.loadDataVoucherNo();
                },
                change: function(combo) {
                    var me = this;
                    var kelsub_id = combo.value;
                    me.loadDataSubgl(kelsub_id);

                    me.loadDataVoucherNo();
                },
                blur: function(combo) {
                    var me = this;
                    var kelsub_id = combo.value;
                    me.loadDataSubgl(kelsub_id);

                    me.loadDataVoucherNo();
                }
            },
            'inputpphformdata [name=subgl_id]': {
                select: function(combo, records) {
                    var me = this;
                    var f  = me.getFormdata();

                    var subgl = f.down("[name=subgl_id]").getValue();
                    var description = f.down("[name=subgl_id]").valueModels[0].data.subdesc;

                    if (subgl == '' ) {
                        description = '';
                    }

                    f.down("[name=subgl_description]").setValue(description);

                    me.loadDataVoucherNo();
                },
                change: function(combo, records) {
                    var me = this;
                    var f  = me.getFormdata();

                    var subgl = f.down("[name=subgl_id]").getValue();
                    var description = '';

                    if (subgl == '' ) {
                        description = '';
                    } else {
                        description = f.down("[name=subgl_id]").valueModels[0].data.subdesc;
                    }

                    f.down("[name=subgl_description]").setValue(description);
                },
                keyup: function() {
                    var me = this;
                    var f  = me.getFormdata();

                    var kelsub_id = f.down("[name=kelsub_id]").getValue();
                    var subgl = f.down("[name=subgl_id]").getValue();
                    var subgl_code = f.down("[name=subgl_id]").getRawValue();

                    me.loadDataSubglWithQuery(kelsub_id, subgl_code);
                },
            },
            'inputpphformdata [name=all_sub]': {
                change: function (el, newValue, oldValue, eOpts) {
                    if (newValue === true) {
                        Ext.getCmp('inputpph_subgl_id').setValue('');
                        Ext.getCmp('inputpph_subgl_description').setValue('');
                        Ext.getCmp('inputpph_subgl_id').setReadOnly(true);
                    } else {
                        Ext.getCmp('inputpph_subgl_id').setValue('');
                        Ext.getCmp('inputpph_subgl_description').setValue('');
                        Ext.getCmp('inputpph_subgl_id').setReadOnly(false);
                    }
                }
            },
            'inputpphformdata [name=date_from]': {
                select: me.loadDataVoucherNo,
                blur: me.loadDataVoucherNo
            },
            'inputpphformdata [name=date_to]': {
                select: me.loadDataVoucherNo,
                blur: me.loadDataVoucherNo
            },
            'inputpphformdata [name=voucher_no_from]': {
                change: function() {
                    var me = this;
                    var f  = me.getFormdata();

                    var voucher_no_from = f.down("[name=voucher_no_from]").getValue();
                    f.down("[name=voucher_no_from]").setValue(voucher_no_from);
                }
            },
            'inputpphformdata [action=search]': {
                click: function() {
                    var me = this;
                    me.searchData();
                }
            },
            'inputpphformdata [action=update]': {
                click: me.updatepph
            },
            'inputpphformdata [action=report]': {
                click: me.generateReport
            }
        });
    },
    loadDataCombobox: function() {

        var me = this;
        var f  = me.getFormdata();

        // load data project/pt
        var projectptstore = f.down("[name=projectpt_id]").getStore();
        projectptstore.load({
            callback: function(record) {
                me.loadDataCoa(parseInt(apps.project), parseInt(apps.pt));
            }
        });

        
    },
    loadDataCoa: function(project_id, pt_id) {
        var me = this;
        var f = me.getFormdata();
        var coastore = me.getStore('Coa');
        coastore.load({
            params: {
                'hideparam': 'getallcoawithsubaccount',
                'project_id': project_id,
                'pt_id': pt_id
            },
            callback: function(records) {
                if (records) {
                    var firstdata = records[0].data.coa_id;
                    var lastdata  = records[records.length - 1].data.coa_id;

                    f.down("[name=coafrom]").setValue(firstdata);
                    f.down("[name=coato]").setValue(lastdata);
                }
            }
        })
    },
    loadDataKelsub: function(coa_id_from, coa_id_to) {
        var me = this;
        var f  = me.getFormdata();
        var kelsubstore = me.getStore('Subaccountgroupfs');
        var coafrom = f.down("[name=coafrom]").getRawValue();
        var coato = f.down("[name=coato]").getRawValue();
        var pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;

        if (coa_id_from != '' && coa_id_to != '' && project_id != '' && pt_id != '') {

            kelsubstore.load({
                params: {
                    'hideparam': 'filtersubaccgroup',
                    'fromcoa': coafrom,
                    'untilcoa': coato,
                    'start': 0,
                    'pt_id':pt_id,
                    'project_id': project_id
                },
                callback: function(record) {
                    if (record.length > 0) {
                        var firstdata = record[0].data.kelsub_id;

                        f.down("[name=kelsub_id]").setValue(firstdata);
                    }
                }
            })
        }
    },
    loadDataSubgl: function(kelsub_id) {
        var me = this;
        var f  = me.getFormdata();
        var project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var all_subgl = f.down("[name=all_sub]").getValue();
        var subglstore = f.down("[name=subgl_id]").getStore();

        if (all_subgl == false) {
            subglstore.load({
                params: {
                    "hideparam": "getsubglbykelsub",
                    "project_id": project_id,
                    "pt_id": pt_id,
                    "kelsub_id": kelsub_id
                },
                callback: function(record) {
                    if (record.length > 0) {
                        var firstdata = record[0].data.subgl_id;
    
                        f.down("[name=subgl_id]").setValue(firstdata);
                    } else {
                        f.down("[name=subgl_id]").setValue('');
                    }
                }
            })
        }
    },
    loadDataSubglWithQuery: function(kelsub_id, query) {
        var me = this;
        var f  = me.getFormdata();
        var project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;
        var pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;
        var subglstore = f.down("[name=subgl_id]").getStore();
        subglstore.load({
            params: {
                "hideparam": "getsubglbykelsub",
                "project_id": project_id,
                "pt_id": pt_id,
                "kelsub_id": kelsub_id,
                "query": query
            },
            callback: function(record) {
            }
        })
    },
    loadDataVoucherNo: function() {
        var me = this;
        var f = me.getFormdata();
        var date_to = Ext.Date.format(f.down("[name=date_to]").getValue(), 'Y-m-d');
        var date_from = Ext.Date.format(f.down("[name=date_from]").getValue(), 'Y-m-d');
        var coa_from = f.down("[name=coafrom]").getRawValue();                    
        var coa_to = f.down("[name=coato]").getRawValue();     
        var kelsub_id = f.down("[name=kelsub_id]").getValue();               
        var subgl_id = f.down("[name=subgl_id]").getValue(); 
        var all_subgl = f.down("[name=all_sub]").getValue();
        var project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;    
        var pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;  
        
        f.down("[name=voucher_no_from]").setValue('');
        f.down("[name=voucher_no_until]").setValue('');

        if (project_id != '' && pt_id != '' && date_to != '' && date_from != '' && coa_from != '' && coa_to != '' && kelsub_id != '' && (subgl_id != '' || all_subgl == true)) {
            Ext.Ajax.request({
                url: 'cashier/inputpph/read',
                params: {
                    'coafrom': coa_from,
                    'coato': coa_to,
                    'kelsub_id': kelsub_id,
                    'subgl_id': subgl_id,
                    'date_from': date_from,
                    'date_to': date_to,
                    'parametersql': 'read',
                    'hideparam': 'getvoucherno',
                    'project_id': project_id,
                    'pt_id': pt_id
                },
                success: function(response) {
                    var res = Ext.JSON.decode(response.responseText);
                    var data = res.data;
                    var vouchernostore = f.down("[name=voucher_no_from]").getStore();
    
                    vouchernostore.removeAll();

                    for (var i = 0; i <= data.length; i++) {
                        if (data[i] !== undefined) {

                            if (vouchernostore.findExact('voucher_no', data[i].voucher_no) === -1) {
                                vouchernostore.add({
                                    'voucher_no': data[i].voucher_no
                                });
                            }
                        }
                    }
                }
            })
        }
    },
    searchData: function() {
        var me = this;
        var f = me.getFormdata();
        var gridstore = me.getGrid().getStore();
        var form = f.getForm();

        if (f.down("[name=subgl_id]").getValue() == "" && f.down("[name=all_sub]").getValue() === false) {
            f.down("[name=subgl_id]").allowBlank = false;
        } else {
            f.down("[name=subgl_id]").allowBlank = true;
        }

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            gridstore.getProxy().setExtraParam('coafrom', f.down("[name=coafrom]").getRawValue());
            gridstore.getProxy().setExtraParam('coato', f.down("[name=coato]").getRawValue());
            gridstore.getProxy().setExtraParam('date_from', Ext.Date.format(f.down("[name=date_from]").getValue(), 'Y-m-d'));
            gridstore.getProxy().setExtraParam('date_to', Ext.Date.format(f.down("[name=date_to]").getValue(), 'Y-m-d'));
            gridstore.getProxy().setExtraParam('project_id', f.down("[name=projectpt_id]").valueModels[0].data.project_id);
            gridstore.getProxy().setExtraParam('pt_id', f.down("[name=projectpt_id]").valueModels[0].data.pt_id);
            gridstore.getProxy().setExtraParam('kelsub_id', f.down("[name=kelsub_id]").getValue());
            gridstore.getProxy().setExtraParam('subgl_id', f.down("[name=subgl_id]").getValue());
            gridstore.getProxy().setExtraParam('voucher_no_from', f.down("[name=voucher_no_from]").getValue());
            gridstore.getProxy().setExtraParam('voucher_no_until', f.down("[name=voucher_no_until]").getValue());
            gridstore.getProxy().setExtraParam('hideparam', f.down("[name=hideparam]").getValue());

            gridstore.load();
        }
    },
    updatepph: function() {
        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        var f = me.getFormdata();
        var arrData = [];

        for (var i = 0; i < store.getCount(); i++) {

            if (store.getAt(i).get('flag_pph') == 1 && (store.getAt(i).get('document_date') == null || store.getAt(i).get('document_no') == null || store.getAt(i).get('receive_date') == null)) {
                Ext.Msg.alert("Info", "Document Date / Document No. / Receive Date cannot be empty while Flag PPH is checked.");
                return false;
            } else {
                if (store.getAt(i).get('flag_pph') == 1 || (store.getAt(i).get('flag_pph') == 0 && store.getAt(i).get('journalsubdetail_pph_id') > 0)) {
                    arrData.push({
                        journalsubdetail_pph_id: store.getAt(i).get('journalsubdetail_pph_id'),
                        journalsubdetail_id: store.getAt(i).get('journalsubdetail_id'),
                        flag_pph: store.getAt(i).get('flag_pph'),
                        document_date: store.getAt(i).get('document_date'),
                        document_no: store.getAt(i).get('document_no'),
                        receive_date: store.getAt(i).get('receive_date')
                    })
                }
            }
        }

        f.setLoading("Please wait, processing data...");
        Ext.Ajax.request({
            url: 'cashier/inputpph/create',
            params: {
                hideparam: 'default',
                data: Ext.encode({
                    'pph': arrData
                })
            },
            success: function(response) {
                f.setLoading(false);
                var res = Ext.JSON.decode(response.responseText);
                
                store.reload();

                if (res.success == true) {
                    Ext.Msg.alert("Info", "Data saved successfully.");
                    return false;
                } else {
                    Ext.Msg.alert("Error", res.msg);
                    return false;
                }  
            }
        })
    },
    generateReport: function() {
        var me = this;
        var f = me.getFormdata();

        var gridstore = me.getGrid().getStore();
        var form = f.getForm();

        //console.log(form.getValues());
        var addingRecord = false;
        if (!me.finalValidation()) {
            return false;
        }

        var vp = me.validationProcess();
        var vps = false; // validation prosess status
        if (typeof vp === 'object') {
            vps = vp.status;
            if (!vps) {

                Ext.MessageBox.alert('Alert', vp.msg, function () {
                    var x = me.getFormdata().down('[name=' + vp.field + ']');
                    if (x !== null) {
                        x.markInvalid(vp.msg);
                        x.focus();
                    }

                });
            }
        } else if (typeof vp === 'boolean') {
            vps = vp;
        }


        if (form.isValid() && vps) {
            var fida = me.getFinalData(form.getValues());
            fida.project_id = f.down("[name=projectpt_id]").valueModels[0].data.project_id;
            fida.pt_id = f.down("[name=projectpt_id]").valueModels[0].data.pt_id;
            fida.projectpt_name = f.down("[name=projectpt_id]").valueModels[0].data.ptname;
            fida.userprint = apps.username;
            fida.hideparam = 'generatereport';

            f.setLoading("Please Wait...");
            Ext.Ajax.request({
                url: 'cashier/inputpph/create',
                params: {
                    data: Ext.encode(fida),
                    hideparam: 'generatereport'
                },
                success: function(response) {
                    f.setLoading(false);
                    var info = Ext.JSON.decode(response.responseText);
                    var file_path = info.data.url;  
                    var a = document.createElement('A');
                    a.href = file_path;
                    a.download = a.download = 'reportBuktiPotongPPh_' + Ext.Date.format(new Date(), 'dmYHis') + '.xlsx';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            })
        }
    }
});
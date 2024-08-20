Ext.define('Cashier.controller.Vupload', {
    extend: 'Cashier.library.template.controller.Controller2',
    alias: 'controller.Vupload',
    requires: [
        'Cashier.library.tools.Mytools',
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.box.tools.Tools'
    ],
    views: [
        'vupload.Panel',
        'vupload.FormData',
        'vupload.DataUploadGrid',
        'vupload.FormDataUpload',
    ],
    stores: [
        'Vupload',
        'Ptbyusermulti'
    ],
    models: [
        'Vupload',
        'Projectpt'
    ],
    refs: [{
            ref: 'panel',
            selector: 'vuploadpanel'
        },
        { ref: 'formdata', selector: 'vuploadformdata' },
        { ref: 'formdataupload', selector: 'vuploadformdataupload' },
        { ref: 'datauploadgrid', selector: 'vuploaddatauploadgrid' },
        { ref: 'winaj', selector: 'win-uploadformdata' },
    ],
    //setting properties variabel
    controllerName: 'vupload',
    fieldName: '',
    bindPrefixName: 'Vupload',
    urlsubmit: 'cashier/vupload/create',
    yeardata: null,
    fromdate: null,
    untildate: null,
    getyear: null,
    form: null,
    value: null,
    info: null,
    senddata: null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function(application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({ config: me.myConfig });

        this.control({
            'vuploadpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function(panel) {
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();
                    panel.up('window').maximize();
                    //                    me.getFormdata().down("[name=projectpt_id]").getStore().load();
                }
            },
            'vuploadformdata': {
                afterrender: function(panel) {
                    me.getFormdata().down("[name=is_merge_coa]").setValue('no');
                }
            },
            'vuploadformdata button[action=submit]': {
                click: this.dataSubmit
            },
            'vuploadformdata button[action=reset]': {
                click: function(v) {
                    var me = this;
                    me.getDatauploadgrid().getStore().removeAll();
                    me.getDatauploadgrid().getStore().sync();

                }
            },
            'vuploaddatauploadgrid toolbar button[action=upload]': {
                click: function(v) {
                    var me = this;
                    me.FormDataUploadShow();

                }
            },
            'vuploadformdataupload': {
                boxready: function() {
                    var me = this;
                    $('#sample').on('click', function(event) {
                        event.preventDefault();

                        me.downloadSample();
                    });
                }
            },
            'vuploadformdataupload button[action=upload]': {
                click: function() {
                    this.UploadVoucher();
                }
            },
            'vuploadformdataupload [name=file-path]': {
                change: function(me) {
                    this.validatefiletype(me);
                }
            }
            //            'vuploadformdata [name=projectpt_id]': {
            //                change: function (field, newValue, oldValue, desc) {
            //                    me.ProjectPtChange(newValue);
            //                }
            //            },
        });
    },
    FormDataUploadShow: function() {
        var me = this;
        var f = me.getFormdata();
        //        console.log(f.down("[name=projectpt_id]").getValue());
        //        if(f.down("[name=projectpt_id]").getValue()==null){
        //            me.tools.alert.warning("Please choose your company first");
        //        }else{
        me.instantWindow('FormDataUpload', 500, 'Upload Excel', 'create', 'myvoucheformpayment');
        //        }
    },
    //    ProjectPtChange: function(projectpt_id){
    //        var me = this;
    //        var f = me.getFormdata();
    //        var e = f.down("[name=projectpt_id]");
    //        var x = e.getStore().findRecord("projectpt_id", projectpt_id);
    //        var store = me.getDatauploadgrid().getStore();
    //        if(projectpt_id!=''){
    //            store.each(
    //                function(storeRecord, index, count) {
    //                    store.getAt(index).set('project_id', x.data['project_id']);  
    //                    store.getAt(index).set('pt_id', x.data['pt_id']);
    //                }
    //            );
    //        }
    //        
    //    },
    UploadVoucher: function() {
        var me = this;
        var f = me.getFormdata();
        //        var e = f.down("[name=projectpt_id]");
        //        var x = e.getStore().findRecord("projectpt_id", f.down("[name=projectpt_id]").getValue());
        var form = me.getFormdataupload();
        var store = me.getDatauploadgrid().getStore();

        var filename = form.down("[name=file-path]").getValue();
        if (filename == "" || filename == null) {
            Ext.MessageBox.show({
                title: 'Invalid file',
                msg: 'Please select files to upload',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        //        form.down("[name=project_id]").setValue(x.data['project_id']);
        //        form.down("[name=pt_id]").setValue(x.data['pt_id']);
        form.down("[name=mode_read]").setValue('upload');
        if (true) {
            form.submit({
                url: 'cashier/vupload/read',
                waitMsg: 'Processing data...',
                success: function(fp, o) {
                    var dt = o.result.data;

                    store.add(dt[0]);
                    form.up('window').close();
                },
                failure: function(fp, o) {
                    Ext.Msg.alert('Warning', 'Processing failed !');
                }
            });
        }
    },
    dataSubmit: function() {
        var me = this;
        var storeaj = me.getDatauploadgrid().getStore();
        var p = me.getFormdata();
        //        console.log(storeaj);
        var coutaj = storeaj.getCount();
        var returnmsg = '<ul>';
        var result = true;
        var errormsg = [];
        var errorvuploadid = [];
        var nextProcess = false;
        Ext.MessageBox.confirm(
            'Confirm', 'Are you sure you want to do this ?', callbackFunction);

        function callbackFunction(btn) {
            if (btn == 'yes') {
                p.setLoading("Prepare for validating data... ");
                if (coutaj > 0) {
                    var i = 0;
                    var task = new Ext.util.DelayedTask(function() {
                        if (i <= coutaj) {
                            var err = 0;
                            storeaj.each(function(recordaccount, accountindex) {
                                if (i == accountindex) {
                                    Ext.Ajax.request({
                                        url: 'cashier/vupload/read',
                                        method: 'POST',
                                        timeout: 10000000,
                                        async: false,
                                        params: {
                                            data: Ext.encode(recordaccount.data),
                                            mode_read: 'validation'
                                        },
                                        success: function(response) {

                                            var data = Ext.JSON.decode(response.responseText);
                                            var coa_detail = recordaccount.data['coa_detail'].replace(".", "");
                                            if (data.data['IS_EXIST'] == false) {
                                                result = false;
                                                if (errormsg[coa_detail.replace(".", "") + "" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']] === undefined) {
                                                    errormsg.push(recordaccount.data['coa_detail'] + "" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA ' + recordaccount.data['coa_detail'] + ' is not exist in Master Coa for PROJECT_ID ' + recordaccount.data['project_id'] + ' and PT_ID ' + recordaccount.data['pt_id'] + '. </li>';
                                                }
                                            }
                                            if (data.data['kelsub_id'] != 0 && recordaccount.data['sub_unit'] == '') {
                                                result = false;
                                                if (errormsg[coa_detail.replace(".", "") + "00" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']] === undefined) {
                                                    errormsg.push(coa_detail.replace(".", "") + "kelsub" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> COA ' + recordaccount.data['coa_detail'] + ' need a Sub Account. Please insert a sub in column SUB on your file upload. </li>';
                                                }
                                            }
                                            if (data.data['kelsub_id'] != 0 && recordaccount.data['sub_unit'] != '' && data.data['IS_EXIST_SUB'] == false) {
                                                result = false;
                                                if (errormsg[coa_detail.replace(".", "") + "00" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']] === undefined) {
                                                    errormsg.push(coa_detail.replace(".", "") + "sub" + recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> SUB ' + recordaccount.data['sub_unit'] + ' is doesn`t exist. Please insert a new sub in Master Sub Account. </li>';
                                                }
                                            }
                                            if (data.data['IS_EXIST_PROJECTPT'] == false) {
                                                result = false;
                                                if (errormsg[recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']] === undefined) {
                                                    errormsg.push(recordaccount.data['project_id'] + "" + recordaccount.data['pt_id']);
                                                    returnmsg = returnmsg + '<li> PROJECT_ID ' + recordaccount.data['project_id'] + ' and PT_ID ' + recordaccount.data['pt_id'] + ' is not exist in Master Project PT. Please contact administrator.</li> ';
                                                }
                                            }
                                            if (recordaccount.data['vendor_name'] === "" || recordaccount.data['vendor_name'] == null) {
                                                result = false;
                                                returnmsg = returnmsg + '<li>You have a blank value in Vendor Name Column. Please insert first.</li> ';
                                            }
                                            if (recordaccount.data['pengajuandate'] === "" || recordaccount.data['pengajuandate'] == null || recordaccount.data['pengajuandate'] == '1900-01-01') {
                                                result = false;
                                                returnmsg = returnmsg + '<li>You have a blank value in `Tanggal Pengajuan` column. Please insert first.</li> ';
                                            }
                                            if (data.data['allowedprefix'] == 0) {
                                                result = false;
                                                returnmsg = returnmsg + '<li>Prefix Coa header `' + recordaccount.data['coa_header'] + '` tidak aktif </li> ';
                                            }
                                            if (data.data['IS_EXISTS_UPLOADID'] == true) {
                                                result = false;
                                                returnmsg = returnmsg + '<li>Voucher ID ' + recordaccount.data['uploaduniquenumber'] + ' Already Existing</li> ';
                                            } else {
                                                if (data.data['allowedvuploadid'] == 0) {
                                                    result = false;
                                                    if (errorvuploadid[recordaccount.data['uploaduniquenumber']] === undefined) {
                                                        errorvuploadid.push(recordaccount.data['uploaduniquenumber']);
                                                        returnmsg = returnmsg + '<li>ID `' + recordaccount.data['uploaduniquenumber'] + '` in your `Voucher ID` column has paid/realized/posting. This voucher is cannot be change. Please check your file or unpaid/unrealize to change this voucher.</li> ';
                                                    }
                                                }
                                            }
                                            if (data.data['IS_NOT_EXISTS_DEPARTMENTID'] == true) {
                                                result = false;
                                                returnmsg = returnmsg + '<li>Department ' + recordaccount.data['department'] + ' tidak ada pada project dan pt tersebut</li> ';
                                            }
                                        },
                                        failure: function(response) {
                                            err++;
                                        }
                                    });
                                }
                            });

                            var perc = (i / coutaj) * 100;
                            if (err > 0) {
                                Ext.Msg.alert("Error", "An error occurred, the data type you entered was wrong");
                                task.cancel();
                                p.setLoading(false);
                                return false;
                            } else {
                                p.setLoading("Validating data... (" + perc.toFixed(2) + "%)");
                                task.delay(200);
                            }
                            i++;
                        } else {
                            p.setLoading("Prepare for processing voucher data... ");
                            var nextTask = new Ext.util.DelayedTask(function() {
                                me.createVoucherProcess(result, returnmsg, storeaj);
                            })
                            nextTask.delay(200);
                        }
                    })
                    task.delay(200);
                }
            } else {

            }
        };

    },
    createVoucherProcess: function(result, returnmsg, storeaj) {

        var me = this;
        var p = me.getFormdata();
        returnmsg = returnmsg + '</ul>';

        if (result == true) {
            var i = 0;
            var task = new Ext.util.DelayedTask(function() {
                if (i <= storeaj.getCount()) {
                    storeaj.each(function(recordaccount, accountindex) {

                        if (i == accountindex) {
                            Ext.Ajax.request({
                                url: 'cashier/vupload/create',
                                method: 'POST',
                                timeout: 10000000,
                                async: false,
                                params: {
                                    data: Ext.encode(recordaccount.data),
                                    is_merge_coa: me.getFormdata().down("[name=is_merge_coa]").getValue()
                                },
                                success: function(response) {
                                    console.log(response);
                                },
                                failure: function(response) {

                                }
                            });
                        }
                    });

                    var perc = (i / storeaj.getCount()) * 100;
                    p.setLoading("Processing voucher... (" + perc.toFixed(2) + "%)");
                    task.delay(200);
                    i++;
                } else {
                    me.tools.alert.info("Successfully uploaded data.");
                    p.setLoading(false);
                }
            })
            task.delay(200);
        } else {
            me.tools.alert.warning(returnmsg);
            p.setLoading(false);
        }
    },
    validatefiletype: function(me) {

        var indexofPeriod = me.getValue().lastIndexOf("."),
            uploadedExtension = me.getValue().substr(indexofPeriod + 1, me.getValue().length - indexofPeriod);

        var fullPath = me.getValue();
        var lastIndex = fullPath.lastIndexOf('\\');
        var fileName = fullPath.substring(lastIndex + 1);

        console.log(uploadedExtension);

        var allowedExtns = ['csv', 'txt'];
        if (!Ext.Array.contains(allowedExtns, uploadedExtension.toLowerCase())) {
            me.setActiveError('Please Use csv or txt File Format!');
            Ext.MessageBox.show({
                title: 'File Type Error',
                msg: 'Please Use csv or txt File Format!',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            me.setRawValue(null);
            return;
        }
        me.setRawValue(fileName);
    },

    downloadSample: function() {
        var me = this;
        console.log(apps);
        Ext.Ajax.request({
            url: 'cashier/vupload/read',
            method: 'POST',
            async: false,
            timeout: 1000000,
            params: {
                project_id: apps.project,
                pt_id: apps.pt,
                mode_read: 'downloadsample'
            },
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                var file_path = data.data
                var a = document.createElement('A');
                a.href = file_path;
                a.download = file_path.substr(file_path.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }
});
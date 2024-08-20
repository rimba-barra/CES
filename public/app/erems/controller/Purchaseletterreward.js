Ext.define('Erems.controller.Purchaseletterreward', {
    //    extend: 'Erems.library.template.controller.Controlleralt',
    extend      : 'Erems.library.template.controller.Controller',
    requires    : ['Erems.library.DetailtoolAll', 'Erems.library.box.tools.Tools'],
    alias       : 'controller.Purchaseletterreward',
    views       : ['purchaseletterreward.Panel', 'purchaseletterreward.Grid', 'purchaseletterreward.RewardGrid', 'purchaseletterreward.FormSearch', 'purchaseletterreward.FormData', 'purchaseletterreward.FormDataDetail'],
    stores      : ['Purchaseletterreward', 'Purchaseletterrewarddetail', 'Masterreward'],
    models      : ['Purchaseletter', 'Purchaseletterreward', 'Purchaseletterrewarddetail', 'Masterreward'],
    detailTool  : null,
    detailTool2 : null,
    datapl      : [],
    dataprt     : [],
    refs        : [
        {
            ref      : 'panel',
            selector : 'purchaseletterrewardpanel'
        },
        {
            ref      : 'grid',
            selector : 'purchaseletterrewardgrid'
        },
        {
            ref      : 'formsearch',
            selector : 'purchaseletterrewardformsearch'
        },
        {
            ref      : 'formdatapl',
            selector : 'purchaseletterformdata'
        },
        {
            ref      : 'formdata',
            selector : 'purchaseletterrewardformdata'
        },
        {
            ref      : 'detailgrid',
            selector : 'purchaseletterrewardgriddetail'
        },
        {
            ref      : 'formdatadetail',
            selector : 'purchaseletterrewardformdatadetail'
        },
    ],
    controllerName : 'purchaseletterreward',
    fieldName      : 'berkas',
    bindPrefixName : 'Purchaseletterreward',
    formWidth      : 800,
    ctrler         : '', //for get controller on browse item
    spcreq         : '', //for get param_spcreq on browse item
    mnuname        : '',
    sprIndex       : 0,
    tools          : null,
    setVar         : {
        masterreward     : null,
        editingIndexRow  : 0,
        master_im        : [],
        master_im_detail : [],
    },
    constructor : function (configs) {
        this.callParent(arguments);
        
        var me = this;

        me.myConfig = new Erems.library.box.Config({ _controllerName : me.controllerName });
        me.tools    = new Erems.library.box.tools.Tools({config: me.myConfig});
    },
    init: function (application) {
        var me = this;

        // me.myConfig = new Erems.library.box.Config({ _controllerName : me.controllerName });
        // me.tools    = new Erems.library.box.tools.Tools({ config: me.myConfig });

        this.control({
            'purchaseletterrewardpanel': {
                beforerender : me.mainPanelBeforeRender,
                afterrender  : this.panelAfterRender
            },
            'purchaseletterrewardgrid': {
                afterrender     : this.gridAfterRender,
                itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            'purchaseletterrewardgrid actioncolumn': {
                afterrender : this.gridActionColumnAfterRender,
                click       : this.gridActionColumnClick
            },
            'purchaseletterrewardgriddetail toolbar button[action=add]': {
                click : function(){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.addreward();
                    }
                }
            },
            'purchaseletterrewardgriddetail toolbar button[action=edit]': {
                click : function(){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.formdatadetailactionEdit();
                    }
                }
            },
            'purchaseletterrewardgriddetail toolbar button[action=delete]': {
                click : function(){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.formdatadetailactionDelete();
                    }
                }
            },
            'purchaseletterrewardgriddetail': {
                selectionchange : function(){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.formdatadetailSelection();
                    }
                }
            },
            'purchaseletterrewardformsearch': {
                afterrender : this.formSearchAfterRender
            },
            'purchaseletterrewardformsearch button[action=search]': {
                click : this.dataSearch
            },
            'purchaseletterrewardformsearch button[action=reset]': {
                click : this.dataReset
            },
            'purchaseletterrewardformdata': {
                afterrender : this.formDataAfterRender
            },
            'purchaseletterrewardformdata button[action=save]': {
                click : this.dataSave
            },
            'purchaseletterrewardformdata [name=internalmemo_id]': {
                select : function () {
                    me.change_im(me.setVar.master_im_detail);
                }
            },
            'purchaseletterrewardformdatadetail button[action=save]': {
                click : function(){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.formdatadetailSave();
                    }
                }
            },
            'purchaseletterrewardformdatadetail [name=group_id]': {
                select : function () {
                    if(typeof me.getFormdata() != 'undefined'){
                        me.changeGroup();
                    }
                }
            },
            'purchaseletterrewardformdatadetail [name=reward_id]': {
                select : function () {
                    if(typeof me.getFormdata() != 'undefined'){
                        me.changeRewardid();
                    }
                }
            },
            'purchaseletterrewardgriddetail gridcolumn': {
                click: function () {
                    if(typeof me.getFormdata() != 'undefined'){
                        me.setVariableeditrow(me.getDetailgrid().getSelectedRow());
                    }
                }
            },
            'purchaseletterrewardformsearch [name=unit_unit_number]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardformsearch [name=purchaseletter_no]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardformsearch [name=customer_name]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardformsearch [name=unit_virtualaccount_bca]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
            'purchaseletterrewardformsearch [name=unit_virtualaccount_mandiri]': {
                keypress: function (e, el) {
                    var me = this;
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                }
            },
        });
    },
    panelAfterRender: function () {
        var me = this;
        me.getMasterrewardStore().proxy.extraParams = { mode_read: 'masterreward', group_id: -1 };
        me.getMasterrewardStore().load();

    },
    addreward: function () {
        var me = this;
        if(me.detailTool === null){
            me.detailTool = new Erems.library.DetailtoolAll();
        }
        me.detailTool.setConfig({
            viewPanel        : 'FormDataDetail',
            parentFDWindowId : me.id,
            controllerName   : me.controllerName
        });
        me.detailTool.parentGridAlias = 'purchaseletterrewardgriddetail';

        me.detailTool.form().show('create', 500, 'Add Reward');
    },

    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
    },

    fdar: function (el) {
        var me = this;
        var x = {
            init: function () {
            },
            create: function () {
            },
            update: function () {
                var grid  = me.getGrid();
                var store = grid.getStore();
                var rec   = grid.getSelectedRecord();
                var fd    = me.getFormdata();

                fd.loadRecord(rec);

                Ext.Ajax.request({
                    url    : 'erems/purchaseletterreward/read',
                    params : {
                        mode_read         : 'pl_detail',
                        purchaseletter_id : rec.get("purchaseletter_id")
                    },
                    success: function (response) {
                        var res = Ext.JSON.decode(response.responseText);

                        me.setVar.master_im        = res.MASTER_IM.success ? res.MASTER_IM.data : [];
                        me.setVar.master_im_detail = res.MASTER_IM_DETAIL.success ? res.MASTER_IM_DETAIL.data : [];

                        fd.down('[name=pt_name]').setValue(res.data[0]['pt_name']);
                        fd.down('[name=salesman_employee_name]').setValue(res.data[0]['salesman_employee_name']);
                        fd.down('[name=cluster_code]').setValue(res.data[0]['cluster_code']);
                        fd.down('[name=block_code]').setValue(res.data[0]['block_code']);
                        fd.down('[name=block_block]').setValue(res.data[0]['block_block']);
                        fd.down('[name=productcategory_productcategory]').setValue(res.data[0]['productcategory_productcategory']);
                        fd.down('[name=unit_land_size]').setValue(res.data[0]['unit_land_size']);
                        fd.down('[name=unit_long]').setValue(res.data[0]['unit_long']);
                        fd.down('[name=unit_building_size]').setValue(res.data[0]['unit_building_size']);
                        fd.down('[name=unit_width]').setValue(res.data[0]['unit_width']);
                        fd.down('[name=unit_kelebihan]').setValue(res.data[0]['unit_kelebihan']);
                        fd.down('[name=unit_floor]').setValue(res.data[0]['unit_floor']);
                        fd.down('[name=unit_progress]').setValue(res.data[0]['unit_progress']);
                        fd.down('[name=unitstatus_status]').setValue(res.data[0]['unitstatus_status']);
                        fd.down('[name=customer_code]').setValue(res.data[0]['customer_no']);
                        fd.down('[name=customer_zipcode]').setValue(res.data[0]['customer_zipcode']);
                        fd.down('[name=customer_mobile_phone]').setValue(res.data[0]['customer_mobile_phone']);
                        fd.down('[name=customer_home_phone]').setValue(res.data[0]['customer_home_phone']);
                        fd.down('[name=customer_office_phone]').setValue(res.data[0]['customer_office_phone']);
                        fd.down('[name=customer_fax]').setValue(res.data[0]['customer_fax']);
                        fd.down('[name=customer_KTP_number]').setValue(res.data[0]['customer_KTP_number']);
                        fd.down('[name=customer_KTP_address]').setValue(res.data[0]['customer_KTP_address']);
                        fd.down('[name=customer_NPWP]').setValue(res.data[0]['customer_NPWP']);
                        fd.down('[name=customer_NPWP_address]').setValue(res.data[0]['customer_NPWP_address']);
                        fd.down('[name=customer_email]').setValue(res.data[0]['customer_email']);
                        fd.down('[name=unit_electricity]').setValue(res.data[0]['unit_electricity']);
                        fd.down('[name=customer_NPWP_name]').setValue(res.data[0]['customer_npwp_name']);
                        fd.down('[name=firstpurchase_date]').setValue(res.data[0]['firstpurchase_date']);
                        fd.down('[name=city_city_name]').setValue(res.data[0]['city_city_name']);
                        fd.down('[name=customer_address]').setValue(res.data[0]['customer_address']);

                        ////// generate im_cb
                        me.generateComboboxIM(me.setVar.master_im, fd.down('[name=firstpurchase_date]').getValue());
                        fd.down('[name=internalmemo_id]').setValue(res.data[0]['internalmemo_id']);
                    }
                });

                me.getDetailgrid().body.mask('Loading Detail, please wait ...');
                var purchaseletterrewarddetailStore = me.getPurchaseletterrewarddetailStore();
                purchaseletterrewarddetailStore.removeAll();
                purchaseletterrewarddetailStore.load({
                    params: {
                        purchaseletter_id: rec.get("purchaseletter_id"),
                        mode_read: 'detail_grid'
                    },
                    callback: function (pencairanrec) {
                        me.getDetailgrid().body.unmask();
                    }
                });

            }
        };
        return x;
    },
    formdatadetailSelection : function(){
        var me = this;
        var grid = me.getDetailgrid(), row = grid.getSelectionModel().getSelection();
        grid.down('[action=edit]').setDisabled(row.length != 1);
        grid.down('[action=delete]').setDisabled(row.length != 1);
        if (row.length > 0) {
            if (row[0].data['user_check_name']) {
                grid.down('[action=edit]').setDisabled(true);
                grid.down('[action=delete]').setDisabled(true);
            }
            if (row[0].data['user_proses_name']) {
                grid.down('[action=edit]').setDisabled(true);
                grid.down('[action=delete]').setDisabled(true);
            }
        }
    },
    formdatadetailSave : function(){
        var me = this;

        var form    = me.getFormdatadetail();
        var formVal = form.getForm().getValues();
        var fdata   = typeof me.getFormdata() != 'undefined' ? me.getFormdata() : me.getFormdatapl(); /// getFormdatapl dipakai utk purchaseletter
        
        var purchaseletterId = fdata.down('[name=purchaseletter_id]').getValue();

        if (form.getForm().isValid()) {
            var win     = form.up('window');
            var dStore  = me.getDetailgrid().getStore();
            var groupId = formVal.group_id == 1 ? 0 : formVal.group_id;

            var val = {
                purchaseletter_reward_id : formVal.purchaseletter_reward_id,
                purchaseletter_id        : purchaseletterId,
                group_id                 : groupId,
                group_name               : form.down('[name=group_id]').rawValue,
                amount                   : formVal.amount,
                reward                   : form.down('[name=reward_id]').rawValue,
                reward_id                : formVal.reward_id,
                nomor_im                 : formVal.nomor_im,
                tanggal_im               : formVal.tanggal_im,
                note                     : formVal.note
            };

            if (win.state == 'create') {
                var r = dStore.findRecord('reward_id', formVal.reward_id);
                if (r != null){
                    Ext.Msg.alert("Alert", "Sory, can\'t add reward " + form.down('[name=reward_id]').rawValue + " because it already exists on the grid.");
                    return;
                }
                else{
                    me.getDetailgrid().getStore().add(val);
                }
            } 
            else {
                var rec = dStore.getAt(me.setVar.editingIndexRow);
                rec.beginEdit();
                rec.set(val);
                rec.endEdit();
            }

            win.close();
        }
    },
    formdatadetailactionEdit: function () {
        var me  = this;
        var gr  = me.getDetailgrid();
        var rec = gr.getSelectedRecord();
        var row = gr.getSelectionModel().getSelection();

        if (row.length > 0) {
            if(me.detailTool === null){
                me.detailTool = new Erems.library.DetailtoolAll();
            }

            me.detailTool.setConfig({
                viewPanel        : 'FormDataDetail',
                parentFDWindowId : me.id,
                controllerName   : me.controllerName
            });
            me.detailTool.parentGridAlias = 'purchaseletterrewardgriddetail';

            me.detailTool.form().show('update', 500, 'Edit Reward');

            var groupId        = rec.data.group_id == 0 ? 1 : rec.data.group_id;
            var selectorReward = me.getFormdatadetail().down("[name=reward_id]");

            fType = new Array();
            fType.push(selectorReward.valueField);
            fType.push(selectorReward.displayField);

            if(!Boolean(me.setVar.masterreward)){
                me.setVar.masterreward = me.getDatamasterreward();
            }

            var optionsx = [];
            me.setVar.masterreward.forEach(function(v, i, arr){
                if(v.group_id == rec.data.group_id){
                    v.name = v.name.trim();
                    optionsx.push(v);
                }
            });

            var newStore = Ext.create('Ext.data.Store', {
                fields : fType,
                data   : optionsx
            });
            selectorReward.bindStore(newStore);

            me.getFormdatadetail().getForm().setValues({
                purchaseletter_reward_id : rec.data.purchaseletter_reward_id,
                purchaseletter_id        : rec.data.purchaseletter_id,
                group_id                 : groupId,
                amount                   : accounting.formatMoney(rec.data.amount),
                reward_id                : rec.data.reward_id,
                nomor_im                 : rec.data.nomor_im,
                tanggal_im               : rec.data.tanggal_im,
                note                     : rec.data.note
            });
        } 
        else {
            Ext.Msg.alert("Alert", "Please select data");
        }
    },
    formdatadetailactionDelete: function () {
        var me = this;
        var gr = me.getDetailgrid();

        Ext.Msg.confirm('Delete Data', 'Delete record?', function (btn) {
            if (btn == 'yes') {
                var row = gr.getSelectionModel().getSelection();
                if (row.length > 0) {
                    var record = gr.getStore().getAt(me.setVar.editingIndexRow);
                    if(record.data.purchaseletter_reward_id){
                        record.set("deleted", true);
                        gr.getStore().filterBy(function (recod) {
                            return recod.data.deleted == false;
                        });
                    }
                    else{
                        gr.getStore().removeAt(me.setVar.editingIndexRow);
                    }
                    gr.getStore().sort('', 'ASC');
                } 
                else {
                    Ext.Msg.alert("Alert", "Please select data").toFront();
                }
            }
        });
    },
    dataSave: function () {
        var me       = this;
        var formdata = me.getFormdata();
        var form     = formdata.getForm();

        if (!me.finalValidation()) {
            return false;
        }

        if (form.isValid()) {
            resetTimer();

            var rewardStore = me.getDetailgrid().getStore();
            rewardStore.clearFilter(true);

            var data_reward = [];
            for (var i = 0; i < rewardStore.getCount(); i++) {
                rewardStore.each(function (record, idx) {
                    if (i == idx) {
                        data_reward[i] = record.data
                    }
                });
            }


            // var fields = formdata.getValues();
            var myObj  = { 
                purchaseletter_id : formdata.down('[name=purchaseletter_id]').getValue(),
                internalmemo_id   : formdata.down('[name=internalmemo_id]').getValue(),
                data_detail       : data_reward 
            };
            me.getFormdata().up('window').body.mask('Saving, please wait ...');

            Ext.Ajax.request({
                url     : 'erems/purchaseletterreward/create',
                params  : { data : Ext.encode(myObj) },
                success : function (response) {
                    me.getFormdata().up('window').body.unmask();
                    if (Ext.decode(response.responseText).success == true) {
                        Ext.Msg.show({
                            title   : 'Success',
                            msg     : 'Data saved successfully.',
                            icon    : Ext.Msg.INFO,
                            buttons : Ext.Msg.OK,
                            fn      : function () {
                                me.getFormdata().up('window').close();
                            }
                        });
                    } 
                    else {
                        Ext.Msg.show({
                            title   : 'Failure',
                            msg     : 'Error: Unable to save data.',
                            icon    : Ext.Msg.ERROR,
                            buttons : Ext.Msg.OK
                        });
                    }
                },
            });
        }
    },
    // getFinalData: function (formGetValues) {
    //     var finalData = formGetValues;
    //     return finalData;
    // },
    // validationProcess: function () {
    //     return true;
    // },
    changeGroup : function(){
        var me             = this;
        var val            = me.getFormdatadetail().down("[name=group_id]").getValue();
        var groupId        = val == 1 ? 0 : val;
        var selectorReward = me.getFormdatadetail().down("[name=reward_id]");

        selectorReward.setValue('');
        selectorReward.setReadOnly(false);

        fType = new Array();
        fType.push(selectorReward.valueField);
        fType.push(selectorReward.displayField);
        fType.push('generate_notes');

        if(!Boolean(me.setVar.masterreward)){
            me.setVar.masterreward = me.getDatamasterreward();
        }

        var optionsx = [];
        me.setVar.masterreward.forEach(function(v, i, arr){
            if(v.group_id == groupId){
                v.name = v.name.trim();
                optionsx.push(v);
            }
        });

        var newStore = Ext.create('Ext.data.Store', {
            fields : fType,
            data   : optionsx
        });
        selectorReward.bindStore(newStore);
    },
    setVariableeditrow : function(row){
        var me = this;
        me.setVar.editingIndexRow = row;
    },
    getDatamasterreward : function(){
        var result = Ext.JSON.decode(
            Ext.Ajax.request({
                url     : 'erems/purchaseletterreward/read',
                method  : 'POST',
                timeout : 45000000,
                async   : false,
                params  : {mode_read : 'masterreward', page : 1, start : 0, limit : 25, group_id : -1}
            }).responseText
        );

        var data = [];
        if(result.success){
            data = result.data;
        }
        return data;
    },
    changeRewardid : function(){
        var me             = this;
        var form           = me.getFormdatadetail();
        var generate_notes = form.down("[name=reward_id]").valueModels[0].get('generate_notes') ? form.down("[name=reward_id]").valueModels[0].get('generate_notes') : '';
        
        form.down("[name=note]").setValue(generate_notes);
    },
    ///////////////////////////////// batas////////////////////////////
    ////// memointernal ////
    generateComboboxIM : function(master_im, purchase_date){
        var me       = this, 
            form     = typeof me.getFormdata() != 'undefined' ? me.getFormdata() : me.getFormdatapl(), /// getFormdatapl dipakai utk purchaseletter
            db_im    = master_im, 
            data_im  = [], 
            model_im = [];

        if(db_im.length){
            model_im = Object.keys(db_im[0]).map(item => ({name : item}));
            db_im.find(function(rec, i){
                if(form.up('window').state == 'create'){ /// create
                    if(new Date(Ext.Date.format(purchase_date, 'Y-m-d')) >= new Date(rec.periode_start) && new Date(Ext.Date.format(purchase_date, 'Y-m-d')) <= new Date(rec.periode_end)){
                        data_im.push(rec);
                    }
                }
                else{ /// edit
                    if(typeof me.getFormdata() != 'undefined'){ //// for pl Reward
                        if(new Date(Ext.Date.format(purchase_date, 'Y-m-d')) >= new Date(rec.periode_start) && new Date(Ext.Date.format(purchase_date, 'Y-m-d')) <= new Date(rec.periode_end)){
                            data_im.push(rec);
                        }
                    }
                    else{ /// for pl main
                        data_im.push(rec);
                    }
                }
            });
        }

        me.tools.wesea({data : data_im, model : model_im}, form.down("[name=internalmemo_id]")).comboBox();
    },
    change_im : function(master_im_detail){
        var me          = this, 
            form        = typeof me.getFormdata() != 'undefined' ? me.getFormdata() : me.getFormdatapl(), /// getFormdatapl dipakai utk purchaseletter
            deatailGrid = me.getDetailgrid(),
            // storeReward = me.controllerName == 'purchaseletterreward' ? me.getRewarddetailgrid().getStore(),
            storeReward = deatailGrid.getStore(),
            f_im        = form.down('[name=internalmemo_id]'),
            im_id       = f_im.getValue(),
            rec_im      = f_im.findRecordByValue(im_id);

        var indexes = [], exists = [];
        deatailGrid.getStore().each(function(item, index){
            if(me.empty(item.data.user_date_check) && me.empty(item.data.user_date_proses)){
                var rec = deatailGrid.getStore().getAt(index);
                if(rec.data.purchaseletter_reward_id){
                    rec.set("deleted", true);
                }
                else{
                    indexes.push(index);
                }
            }
            else{
                exists.push(item.data.reward_id);
            }
        });

        /////// Removing and filter /////
        var records = Ext.Array.map(indexes, function (idx) {
            return deatailGrid.getStore().getAt(idx);
        });
        deatailGrid.getStore().remove(records);

        deatailGrid.getStore().filterBy(function (recod) {
            return recod.data.deleted == false;
        });
        deatailGrid.getStore().sort('', 'ASC');


        if(im_id){
            for (var x = 0; x < master_im_detail.length; x++) {
                if(master_im_detail[x].internalmemo_id == im_id && !exists.includes(master_im_detail[x].reward_id)){
                    deatailGrid.getStore().add({
                            purchaseletter_reward_id : 0,
                            purchaseletter_id        : form.down('[name=purchaseletter_id]').getValue(),
                            group_id                 : master_im_detail[x].group_id,
                            group_name               : master_im_detail[x].group_name,
                            amount                   : master_im_detail[x].amount,
                            reward                   : master_im_detail[x].reward,
                            reward_id                : master_im_detail[x].reward_id,
                            nomor_im                 : rec_im.get('nomor_im'),
                            tanggal_im               : new Date(rec_im.get('tanggal_im')),
                            note                     : master_im_detail[x].notes    
                    });
                }
            }
        }
    }
});
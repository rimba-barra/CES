Ext.define('Hrd.controller.Trainingname', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Trainingname',
    controllerName: 'trainingname',
    fieldName: 'trainingname',
    bindPrefixName: 'Trainingname',
    uploadFotoKlik:0,
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    refs: [
        {
            ref: 'gridcopy',
            selector: 'trainingnamecopygrid'
        },
        {
            ref: 'formcopy',
            selector: 'trainingnameformcopy'
        },
        {
            ref: 'gridsharepp',
            selector: 'trainingnameshareppgrid'
        },
        {
            ref: 'gridsharetn',
            selector: 'trainingnamesharetngrid'
        },
        {
            ref: 'formshare',
            selector: 'trainingnameformshare'
        },
        {
            ref: 'gridformcompetency',
            selector: 'trainingnameformcompetencygrid'
        },
        {
            ref: 'gridcompetency',
            selector: 'trainingnamecompetencygrid'
        },
        {
            ref: 'formcompetency',
            selector: 'trainingnameformcompetency'
        },
    ],
    
    init: function() {
        var me = this;
        
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        
        var newEvs = {};

        //COPY
        newEvs['button[action=copy_trainingname]'] = {
            click: function () {
                me.formCopyTrainingName();
            },
        };

        newEvs['trainingnameformcopy'] = {
            afterrender: function () {
                me.formCopyTrainingNameAfterRender();
            }
        };

        newEvs['button[action=processcopy_trainingname]'] = {
            click: function () {
                me.processCopyTrainingName();
            },
        };

        //SHARE PROJECT PT
        newEvs['button[action=share_trainingname]'] = {
            click: function () {
                me.formShareTrainingName();
            },
        };

        newEvs['trainingnameformshare'] = {
            afterrender: function () {
                me.formShareTrainingNameAfterRender();
            }
        };

        newEvs['button[action=processshare_trainingname]'] = {
            click: function () {
                me.processShareTrainingName();
            },
        };

        //COMPETENCY
        newEvs['button[action=choose_formcompetency]'] = {
            click: function () {
                me.formCompetencyTrainingName();
            },
        };

        newEvs['button[action=delete_formcompetency]'] = {
            click: function () {
                me.formDeleteCompetencyTrainingName();
            },
        };

        newEvs['trainingnameformcompetency'] = {
            afterrender: function () {
                me.formCompetencyTrainingNameAfterRender();
            }
        };

        newEvs['button[action=save_trainingcompetency]'] = {
            click: function () {
                me.processCompetencyTrainingName();
            },
        };
        
        this.control(newEvs);
    },
    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                // me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                // me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
            }
        }).read('detail');
    },
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
                        // me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                    }
                }).read('detail');
            },
            update: function() {

                me.tools.ajax({
                    params: {
                    },
                    success: function(data, model) {
                        // me.tools.wesea(data.trainingcaption, f.down("[name=trainingcaption_id]")).comboBox();
                        me.tools.wesea(data.competencynames, f.down("[name=competency_name_id]")).comboBox();
                        var rec = g.getSelectedRecord();
                        f.editedRow = g.getSelectedRow();
                        f.getForm().loadRecord(rec);
                        console.log(rec.get('private'));
                        me.getCompetencyExist();
                    }
                }).read('detail');


                me.unMask(1);

            }
        };
        return x;
    },

    //COPY
    formCopyTrainingName: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormCopy", 800, "Copy", "copy", "trainingnameformcopy");
    },
    formCopyTrainingNameAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridcopy();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                sg.reload();
            }
        }).read('gettrainingname');
    },
    processCopyTrainingName: function(){
        var me = this;
        var g = me.getGridcopy();
        rec_g = g.getSelectedRecord();
        
        if(rec_g){
            trainingname_id = rec_g.get("trainingname_id");
            trainingname = rec_g.get("trainingname");
            competency_name_id = rec_g.get("competency_name_id");
            vendor = rec_g.get("vendor");
            skill = rec_g.get("skill");
            type = rec_g.get("type");
            certificate = rec_g.get("certificate");
            trainingcaption_id = rec_g.get("trainingcaption_id");

            me.tools.ajax({
                params: {
                    trainingname_id:trainingname_id,
                    trainingname:trainingname,
                    competency_name_id:competency_name_id,
                    vendor:vendor,
                    skill:skill,
                    type:type,
                    certificate:certificate,
                    trainingcaption_id:trainingcaption_id
                },
                success: function (data, model) {
                    me.getFormcopy().up('window').close();
                    var gr = me.getGrid();
                    var sgr = gr.getStore();
                    sgr.reload();
                    me.tools.alert.info("Success to copy data");
                }
            }).read('copytrainingname');

        }else{
            me.tools.alert.warning("Silahkan pilih Training Name");
        }
    },

    //SHARE PROJECT PT
    formShareTrainingName: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormShare", 800, "Share", "share", "trainingnameformshare");
    },
    formShareTrainingNameAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridsharetn();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                sg.reload();
            }
        }).read('gettrainingname');

        var gpp = me.getGridsharepp();
        var sgpp = gpp.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, gpp).grid();
                sgpp.reload();
            }
        }).read('getprojectptaccess');
    },
    processShareTrainingName: function(){
        var me = this;

        gtn = me.getGridsharetn();
        rec_tn = gtn.getSelectedRecord();
        if(rec_tn){
            id_tn = rec_tn.get("trainingname_id");
            rows_tn = gtn.getSelectionModel().getSelection();
            var trainingname_id = "";
            if (rows_tn.length > 0) {
                for (var i in rows_tn) {
                    trainingname_id += rows_tn[i]['data']["trainingname_id"] + "~";
                }
            }
        }else{
            me.tools.alert.warning("Silahkan pilih Training Name & Project Pt");
        }

        gpp = me.getGridsharepp();
        rec_pp = gpp.getSelectedRecord();
        if(rec_pp){
            id_pp = rec_pp.get("projectpt_id");
            rows_pp = gpp.getSelectionModel().getSelection();
            var projectpt_id = "";
            var project_id = "";
            var pt_id = "";
            if (rows_pp.length > 0) {
                for (var i in rows_pp) {
                    projectpt_id += rows_pp[i]['data']["projectpt_id"] + "~";
                    project_id += rows_pp[i]['data']["project_id"] + "~";
                    pt_id += rows_pp[i]['data']["pt_id"] + "~";
                }
            }
        }else{
            me.tools.alert.warning("Silahkan pilih Training Name & Project Pt");
        }

        if(rec_tn && rec_pp){
            console.log(trainingname_id);
            console.log(projectpt_id);
            console.log(project_id);
            console.log(pt_id);
            
            me.tools.ajax({
                params: {
                    trainingname_id:trainingname_id,
                    projectpt_id:projectpt_id,
                    project_id:project_id,
                    pt_id:pt_id
                },
                success: function (data, model) {
                    me.getFormshare().up('window').close();
                    var gr = me.getGrid();
                    var sgr = gr.getStore();
                    sgr.reload();
                    me.tools.alert.info("Success to share data");
                }
            }).read('sharetrainingname');
        }else{
            me.tools.alert.warning("Silahkan pilih Training Name & Project Pt");
        }

    },

    //COMPETENCY
    formCompetencyTrainingName: function () {
        var me, grid, store;
        me = this;
        me.instantWindow("FormCompetency", 500, "Competency", "competency", "trainingnameformcompetency");
    },
    formCompetencyTrainingNameAfterRender: function () {
        var me, grid, store;
        me = this;
        var g = me.getGridcompetency();
        var sg = g.getStore();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea({data: data, model: model}, g).grid();
                console.log(data);
                console.log(g);
                sg.reload();
            }
        }).read('getcompetency');
    },
    getCompetencyExist: function (el) {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        gfc = me.getGridformcompetency();
        sgfc = gfc.getStore();
        sgfc.reload();
        var trainingname_id = f.down('[name=trainingname_id]').getValue();
        console.log(trainingname_id);
        me.tools.ajax({
            params: {
                'trainingname_id': trainingname_id,
            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, gfc).grid();
            }
        }).read('getcompetencyexist');
    },
    processCompetencyTrainingName: function(){
        var me = this;
        var f = me.getFormdata();
        g = me.getGrid();
        sg = g.getStore();
        fc = me.getFormcompetency();
        gfc = me.getGridformcompetency();
        sgfc = gfc.getStore();
        gc = me.getGridcompetency();
        sgc = gc.getStore();
        rec = gc.getSelectedRecord();
        id = rec.get("competency_name_id");
        rows = gc.getSelectionModel().getSelection();
        var competency_name_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                competency_name_id += rows[i]['data']["competency_name_id"] + "~";
            }
        }
        if(f.down('[name=trainingname_id]').getValue() == '' || f.down('[name=trainingname_id]').getValue() == null){
           trainingname_id = 0;
        } else {
           trainingname_id = f.down('[name=trainingname_id]').getValue();
        }

        if(f.down('[name=trainingname]').getValue() == '' || f.down('[name=trainingname]').getValue() == null){
            me.tools.alert.warning("Input Training Name");
            return false;
        } else {
           trainingname = f.down('[name=trainingname]').getValue();
        }

        console.log(competency_name_id);
        console.log(trainingname_id);
        console.log(trainingname);

        me.tools.ajax({
            params: {
                trainingname_id:trainingname_id,
                competency_name_id:competency_name_id,
                trainingname:trainingname
            },
            success: function (data, model) {
                f.down('[name=trainingname_id]').setValue(data.others[0][0].ID);
                fc.up('window').close();
                sg.reload();
                me.getCompetencyExist();
                sgfc.reload();
            }
        }).read('processcompetencytrainingname');

    },
    formDeleteCompetencyTrainingName: function(){
        var me = this;
        var f = me.getFormdata();
        g = me.getGrid();
        sg = g.getStore();
        fc = me.getFormcompetency();
        gfc = me.getGridformcompetency();
        sgfc = gfc.getStore();
        rec = gfc.getSelectedRecord();
        id = rec.get("competency_name_id");
        rows = gfc.getSelectionModel().getSelection();
        var competency_name_id = "";
        if (rows.length > 0) {
            for (var i in rows) {
                competency_name_id += rows[i]['data']["competency_name_id"] + "~";
            }
        }

        trainingname_id = f.down('[name=trainingname_id]').getValue();

        me.tools.ajax({
            params: {
                trainingname_id:trainingname_id,
                competency_name_id:competency_name_id
            },
            success: function (data, model) {
                me.getCompetencyExist();
                sgfc.reload();
            }
        }).read('processdeletecompetencytrainingname');

    },
});
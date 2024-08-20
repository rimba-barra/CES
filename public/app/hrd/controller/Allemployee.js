Ext.define('Hrd.controller.Allemployee', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Allemployee',
    views: ['allemployee.Panel', 'allemployee.Grid', 'allemployee.FormSearch', 'allemployee.GridExport'],
    requires: [
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.box.tools.Util',
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox'
    ],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'allemployeegrid'
        },
        {
            ref: 'formsearch',
            selector: 'allemployeeformsearch'
        },        
        {
            ref: 'gridexport',
            selector: 'allemployeeexportgrid'
        },
    ],
    controllerName: 'allemployee',
    fieldName: 'employee_id',
    bindPrefixName:'Allemployee',
    init: function(application) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        this.control({
            'allemployeepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender             
            },
            'allemployeegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            // 'allemployeegrid actioncolumn': {
            //     afterrender: this.gridActionColumnAfterRender,
            //     click: this.gridActionColumnClick
            // },
            'allemployeeformsearch button[action=search]': {
                click: me.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'allemployeeformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'allemployeegrid button[action=export]': {
                click: this.exportList
            },
            'allemployeeexportgrid button[action=export]': {
                click: this.exportProcess
            },

            'allemployeeformsearch #fd_subholding': {
                change: this.getAllProject
            },

            'allemployeeformsearch #fd_project': {
                change: this.getAllPT
            },

            // 'allemployeeformsearch #fd_pt': {
            //     change: this.getAllDepartment
            // },
        });
    },

    gridAfterRender: function() {
        var me = this;
        console.log("GRID AFTR RENDER...");
        me.dataReset();

        //biar pas load awal pagingnya ke reload jadi gk muncul 25 data saja
        me.getGrid().down("pagingtoolbar").getStore().reload();
    },

    dataSearch: function() {
        resetTimer();
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();

        me.getGrid().doInit();
        var store = me.getGrid().getStore();

        var data = {
            subholding_id : fields['subholding_id'].join(),
            project_id : fields['project_id'].join(),
            pt_id : fields['pt_id'].join(),
            employee_name : fields['employee_name'],
            sex : fields['sex'],
            age_bot : fields['age_bot'],
            age_top : fields['age_top'],
            masa_kerja_bot : fields['masa_kerja_bot'],
            masa_kerja_top : fields['masa_kerja_top'],
            usia_kerja_bot : fields['usia_kerja_bot'],
            usia_kerja_top : fields['usia_kerja_top'],
            is_pensiun : fields['is_pensiun'],
            last_education : fields['last_education'].join(),
            banding_id : fields['banding_id'].join(),
            employeestatus_id : fields['employeestatus_id'].join(),
            employee_active : fields['employee_active'],
            hire_date_start : fields['hire_date_start'],
            hire_date_end : fields['hire_date_end'],
            assignation_date_start : fields['assignation_date_start'],
            assignation_date_end : fields['assignation_date_end'],
            contractend_date_start : fields['contractend_date_start'],
            contractend_date_end : fields['contractend_date_end'],
            nonactive_date_start : fields['nonactive_date_start'],
            nonactive_date_end : fields['nonactive_date_end'],
        };

        for (var x in data)
        {
            store.getProxy().setExtraParam(x, data[x]);
        }

        me.loadPage(store);
    },

    refreshPagingToolbar: function() {
        var me = this;
        var g = me.getGrid();
        if (g) {
            var pt = me.getGrid().down("pagingtoolbar");
            if (pt) {
                pt.getStore().reload();
            }
        }
    },

    formSearchAfterRender: function (el) {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var fs = me.getFormsearch();    
        
        me.tools.ajax({
            params: {
                
            },
            success: function (data, model) {
                
                var subhData = [];
                for (var v in data) {
                    subhData.push(data[v].trainingallsubholding);
                }
                var subhStore = Ext.create('Ext.data.Store', {
                    fields: ['subholding_id', 'name'],
                    data: subhData
                });
                fs.down("[name=subholding_id]").bindStore(subhStore);
            }
        }).read('getAllSubholding');

        me.tools.ajax({
            params: {
                
            },
            success: function (data, model) {
                var eduData = [];
                for (var v in data.others[0][0].educations[1]) {
                    eduData.push(data.others[0][0].educations[1][v]);
                }
                var eduStore = Ext.create('Ext.data.Store', {
                    fields: ['education_id', 'education'],
                    data: eduData
                });
                fs.down("[name=last_education]").bindStore(eduStore);


                // var empstatusData = [];
                // for (var v in data.others[0][0].empstatus[0]) {
                //     empstatusData.push(data.others[0][0].empstatus[0][v]);
                // }
                // var empstatusStore = Ext.create('Ext.data.Store', {
                //     fields: ['employeestatus_id', 'employeestatus'],
                //     data: empstatusData
                // });
                // fs.down("[name=employeestatus_id]").bindStore(empstatusStore);

                me.tools.wesea(data.banding, fs.down("[name=banding_id]")).comboBox();
            }
        }).read('getcombobox');        
    },

    getAllProject: function (el) {

        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var fs = me.getFormsearch();
        fs.down("[name=project_id]").setValue("");
        fs.down("[name=pt_id]").setValue("");
        me.tools.ajax({
            params: {
                'subholding_id':fs.getValues().subholding_id.join()
            },
            success: function (data, model) {

                var newData = [];
                for (var v in data) {
                    newData.push(data[v].project);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['code', 'name'],
                    data: newData
                });
                fs.down("[name=project_id]").bindStore(newStore);                 
            }
        }).read('getAllProject');     

        // me.tools.ajax({
        //     params: {
        //         'subholding_id':fs.getValues().subholding_id.join()
        //     },
        //     success: function (data, model) {
        //         console.log("position combo");
        //         console.log(data);
        //         // me.tools.wesea(data.others[1], fs.down("[name=subholding_id]")).comboBox();

        //         var newData = [];
        //         for (var v in data) {
        //             newData.push(data[v].position);
        //         }

        //         var newStore = Ext.create('Ext.data.Store', {
        //             fields: ['position_id', 'description'],
        //             data: newData
        //         });

        //         fs.down("[name=position_id]").bindStore(newStore); 
        //         // fs.down("[name=pt_id]").value();              
                
        //     }
        // }).read('getAllPosition');     
    },


    getAllPT: function (el) {

        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.util = new Hrd.library.box.tools.Util();
        var fs = me.getFormsearch();
        fs.down("[name=pt_id]").setValue("");

        me.tools.ajax({
            params: {
                'subholding_id':fs.getValues().subholding_id.join(),                
                'project_id':fs.getValues().project_id.join()
            },
            success: function (data, model) {

                var newData = [];
                for (var v in data) {
                    newData.push(data[v].pt);
                }
                var newStore = Ext.create('Ext.data.Store', {
                    fields: ['code', 'name'],
                    data: newData
                });
                fs.down("[name=pt_id]").bindStore(newStore);
            }
        }).read('getAllPT');        
    },

    // getAllDepartment: function (el) {

    //     console.log("pt change");
    //     var me = this;
    //     var events = new Hrd.library.box.tools.EventSelector();
    //     me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
    //     me.util = new Hrd.library.box.tools.Util();
    //     var fs = me.getFormsearch();
        
    //     console.log(fs.getValues());
    //     console.log(fs.getValues().project_id.join());
    //     me.tools.ajax({
    //         params: {               
    //             // 'project_id':fs.getValues().project_id.join()                   
    //             'project_id':fs.getValues().project_id.join(),         
    //             'pt_id':fs.getValues().pt_id.join()
    //         },
    //         success: function (data, model) {
    //             console.log("department combo");
    //             console.log(data);
    //             // me.tools.wesea(data.others[1], fs.down("[name=subholding_id]")).comboBox();

    //             var newData = [];
    //             for (var v in data) {
    //                 newData.push(data[v].department);
    //             }

    //             var newStore = Ext.create('Ext.data.Store', {
    //                 fields: ['department_id', 'description'],
    //                 data: newData
    //             });

    //             fs.down("[name=department_id]").bindStore(newStore);
    //         }
    //     }).read('getDepartement');     

    //     me.tools.ajax({
    //         params: {               
    //             // 'project_id':fs.getValues().project_id.join()                   
    //             'project_id':fs.getValues().project_id.join(),         
    //             'pt_id':fs.getValues().pt_id.join()
    //         },
    //         success: function (data, model) {
    //             console.log("golongan combo");
    //             console.log(data);
    //             // me.tools.wesea(data.others[1], fs.down("[name=subholding_id]")).comboBox();

    //             var newData = [];
    //             for (var v in data) {
    //                 newData.push(data[v].group);
    //             }

    //             var newStore = Ext.create('Ext.data.Store', {
    //                 fields: ['group_id', 'group'],
    //                 data: newData
    //             });

    //             fs.down("[name=group_id]").bindStore(newStore);
    //         }
    //     }).read('getGolongan');     
    // },

    exportList: function() {
        var me = this;
        me.instantWindow("GridExport", 300, "List Export", "create");
        me.exportlistData();
    },

    exportlistData: function(){
        var me = this;

        var grid = me.getGridexport();
        grid.setLoading("Please wait...");

        me.tools.ajax({
            params: {

            },
            success: function(data, model) {
                me.tools.wesea({data: data, model: model}, grid).grid();
                grid.setLoading(false);
            }
        }).read('exportlist');
    },

    exportProcess: function (el) {
        var me = this;
        var g = me.getGridexport();
        var rec = g.getView().getSelectionModel().getSelection();
        var f = me.getFormsearch();
        var formvalue = f.getForm().getValues();
        var s = g.getSelectionModel().getSelection();

        selected = [];
        Ext.each(s, function (item) {
            var val = {
                header_title : item.data.header_title,
                field: item.data.field,
                num_order: item.data.num_order
            };
            selected.push(val);
        });

        //sort biar ordernya sesuai
        selected.sort(function(a, b) {
          var keyA = a.num_order,
            keyB = b.num_order;
          // Compare the 2 data
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });


        g.setLoading(true);
        me.tools.ajax({
            params: {                               
                export: Ext.encode(selected),
                data: Ext.encode(formvalue)
            },
            success: function (data, model) {
                g.setLoading(false);

                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
            },
            failure: function (response) {
                g.setLoading(false);
            }
        }).read('export');        
    },    
});
/*  JS CONTROLLER FOR 'Competency Names' */

Ext.define('Hrd.controller.Competencynames', {
    extend          : 'Hrd.library.box.controller.Controller',
    alias           : 'controller.Competencynames',
    requires        : [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse'
    ],
    controllerName  : 'competencynames',
    fieldName       : 'competency_name_id',
    bindPrefixName  : 'Competencynames',
    formWidth       : 800,
    uploadImageClick: 0,
    localStore      : {},

    constructor     : function(configs) {
        var me      = this;
        var config  = new Hrd.library.box.tools.DefaultConfig ({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init            : function() {
        var me      = this;
        var events  = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools    = new Hrd.library.box.tools.Tools({config: me.myConfig});
        var newEvs  = {};

        newEvs['competencynamesformdata #file_upload'] = {
            change: function(fld, a) {

                me.formUploadFile(fld, a, 'mode');
            }
        };

        newEvs['competencynamesformdata button[action=lihat_file]'] = {
            click: function() {

                me.lihatFile();
            }
        };

        this.control(newEvs);
    },

    lihatFile:function(){
       var me = this;
       var f = me.getFormdata();
       var fileName = f.down("[name=image_path]").getValue();

       console.log(f.getValues());

       if(fileName.length > 0){
           window.open(document.URL+"app/hrd/uploads/performance_management/image/"+fileName);
      
       }else{
           me.tools.alert.warning("Tidak ada file");
       }
    },

    formUploadFile  : function(fld, a, mode) {
        var me  = this;

        if (me.uploadImageClick === 0) {
            var me      = this;
            var form    = fld.up("form");
            var p       = form.up("window");
            var f       = me.getFormdata();

            me.uploadFile({
                form        : form,
                showalert   : false,
                params      : {
                    "type"      : 'image'
                },
                callback    : {
                    success     : function(fn) {
                        p.setLoading(false);
                        // console.log(fn);
                        // f.down('[name = image_path]').setValue(fn);
console.log(form.down("[name=image_path]"));
console.log()
                        me.uploadImageClick = 0;
                        form.down("[name=image_path]").setValue(fn);
                    },
                    failure     : function() {
                        me.uploadImageClick = 0;
                        p.setLoading(false);
                    }
                }
            });

            me.uploadImageClick = 1;
        }
    },

    fdar            : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        
        me.setActiveForm(f);
        f.setLoading(false);
        ;
        
        var x   = {
            init    : function() {},
            create  : function() {
               me.unMask(1);
               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencycategory, f.down("[name=competency_category_id]")).comboBox();
                    }
                }).read('listcat');
            },
            update  : function() {
               me.unMask(1);

               me.tools.ajax ({
                    params  : {},
                    success : function(data, model) {
                    /* panggil wesea untuk proses hasil master table */
                        me.tools.wesea(data.competencycategory, f.down("[name=competency_category_id]")).comboBox();
                        
                        var g   = me.getGrid();
                        var rec = g.getSelectedRecord();
                        if (rec) {
                            f.editedRow = g.getSelectedRow();
                            f.loadRecord(rec);
                        }
                    }
                }).read('listcat');
            }
        };

        return x;
    },

    mainDataSave    : function() {
        var me  = this;
        var f   = me.getFormdata();
        var g   = me.getGrid();
        var s   = g.getStore();
        var row = f.editedRow;

        me.insSave ({
            form        : f,
            grid        : g,
            finalData   : function(data) {                
                // console.log(data);

                return data;
            },
            sync        : true,
            callback    : {
                create  : function(store, form, grid) {}
            }
        });
    },
});
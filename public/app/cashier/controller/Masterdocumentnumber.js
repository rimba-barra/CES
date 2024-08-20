Ext.define('Cashier.controller.Masterdocumentnumber', {
    extend: 'Cashier.template.ControllerForMaster',
    alias: 'controller.Masterdocumentnumber',
    refs: [
        {
            ref: 'panel',
            selector: 'masterdocumentnumberpanel'
        },
        {
            ref: 'grid',
            selector: 'masterdocumentnumbergrid'
        },
        {
            ref: 'formdata',
            selector: 'masterdocumentnumberformdata'
        },
        {
            ref: 'formsearch',
            selector: 'masterdocumentnumberformsearch'
        },
    ],
    controllerName: 'masterdocumentnumber',
    fieldName: 'format',
    bindPrefixName: 'Masterdocumentnumber',
    formxWinId: 'win-masterdocumentnumberwinId',

    init: function () {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        this.control({

        });
    },
    formdatashow: function (state) {
        var me = this;
        var w = me.instantWindow('FormData', 500, state, state, 'win-formdatamdocumentnumber');
    },
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.grid;
        me.setActiveForm(f);
        var x = {
            init: function () {
                me.fdarInit();
            },
            create: function () {
                me.unMask(1);
                me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', '', f, '', function () {

                });

            },
            update: function () {

                me.getCustomRequestCombobox('detailpt', '', 'pt_pt_id', 'pt', '', f, 'update', function () {

                });

            }
        };
        return x;
    },
    panelAfterRender: function () {
        var me = this;
        var p = me.getPanel();
        var f = me.getFormsearch();
        p.setLoading("Please wait");
        me.tools.ajax({
            params: {module: me.controllerName},
            form: p,
            success: function (data, model) {

                try {
                    me.tools.wesea(data.pt, f.down("[name=pt_pt_id]")).comboBox();
                    me.tools.wesea(data.year, f.down("[name=year]")).comboBox();
                    f.down('[name=pt_id]').setValue(data.ptid);
                } catch (err) {
                    console.log(err.message);
                    me.tools.alert.warning("Failed to generate init.");
                }

                p.setLoading(false);
            }
        }).read('detail');
    },

    mainDataSave: function (mode) {
        var me = this;
        var m = typeof mode !== "undefined" ? mode : "";
        var fa = me.getFormdata();
        if (fa.getForm().isValid()) {
            me.tools.iNeedYou(me).save(false, function (data)
            {
                data.deletedRows = fa.deletedRows;
                return data;
            });
        }

    },
    afterDataDetailInit: function (param, f) { //after
        var me = this;
        var fid = f.ownerCt.id;
        var g = me.getGrid();
        if (fid == "win-masterdocumentnumberwinId") {
            if (param == "update") {
                //me.getPt(f, 'pt_pt_id');
                var rec = g.getSelectedRecord();
                f.editedRow = g.getSelectedRow();
                f.getForm().loadRecord(rec);
                // f.down('[name=voucherprefix_voucherprefix_id]').setValue(rec.get('voucherprefix_voucherprefix_id'));
            }
        }
    },

});

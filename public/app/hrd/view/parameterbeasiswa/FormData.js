Ext.define('Hrd.view.parameterbeasiswa.FormData', {
    alias: 'widget.parameterbeasiswaformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var jenjang = [{
                number: 1,
                name: 'SD'
            }, {
                number: 2,
                name: 'SMP'
            }, {
                number: 3,
                name: 'SMA'
            }];

        var jenjangStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: jenjang
        });


        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'parameterbeasiswa_id'
                },
                {
                    xtype: 'combobox',
                    store: jenjangStore,
                    displayField: 'name',
                    valueField: 'number',
                    name: 'jenjang',
                    fieldLabel: 'Jenjang Pendidikan'
                },
                {
                    name: 'masuk_sekolah',
                    fieldLabel: 'Masuk Sekolah'
                },
                {
                    name: 'beasiswa',
                    fieldLabel: 'beasiswa',
                },
                {
                    name: 'jumlah_semester',
                    fieldLabel: 'Jumlah Semester',
                },
                {
                    name: 'lama_persemester',
                    fieldLabel: 'Lama per Semester',
                }

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });

        me.callParent(arguments);
    }

});
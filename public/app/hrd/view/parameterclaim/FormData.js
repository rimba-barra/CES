Ext.define('Hrd.view.parameterclaim.FormData', {
    alias: 'widget.parameterclaimformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.parameterclaim.GridGolongan'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
        //var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [{
                    xtype: 'hiddenfield',
                    name: 'masterjenispengobatan_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'parameterjenispengobatan_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'project_id',
                }, {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                }, {
                    xtype: 'textfield',
                    name: 'jenispengobatan',
                    fieldLabel: 'Jenis Pengobatan',
                    readOnly: true,
                    width: 350
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Gender',
                    name: 'sex',
                    store : new Ext.data.SimpleStore({
                    data : [['m', 'M'], ['f', 'F'], ['all', 'All']],
                        fields : ['value', 'text']
                    }),
                    width:350,
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Min Status Karyawan',
                    name: 'employeestatus_id',
                    store : new Ext.data.SimpleStore({
                    data : [[1, 'permanent'], [2, 'contract']],
                        fields : ['value', 'text']
                    }),
                    width:350,
                    valueField : 'value',
                    displayField : 'text',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Min Masa Kerja (dalam bulan)',
                    maskRe: /[0-9]/,
                    name: 'min_workingmonth',
                    enableKeyEvents: true,
                    width:350,
                    // margin: '10px 0',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Klaim berdasarkan tanggal',
                    name: 'claimbasedon_id',
                    width:350,
                    displayField: 'claimbasedon',
                    valueField: 'claimbasedon_id',
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Update jika ada perubahan',
                    name: 'claimupdate_id',
                    width:350,
                    displayField: 'claimupdate',
                    valueField: 'claimupdate_id',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Max Claim',
                    maskRe: /[0-9]/,
                    name: 'maxclaim',
                    enableKeyEvents: true,
                    width:350,
                    // margin: '10px 0',
                },
                {
                    xtype: 'parameterclaimgridgolongan',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }
                ],

            dockedItems: me.generateDockedItem()
        });
        
        

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'close',
                        itemId: 'btnClose',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',                       
                    }, 
                    {xtype:'tbfill'},
                    
					
                ]
            }
        ];
        return x;
    },
});
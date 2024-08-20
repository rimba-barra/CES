Ext.define('Cashier.view.masterprefix.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.masterprefixformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_prefix_id',
                    name: 'prefix_id'
                },
//                {
//                    xtype: 'hiddenfield',
//                    itemId: 'fmis_project_project_id',
//                    name: 'project_project_id'
//                },
                {
                    xtype: 'combobox',
                    name: 'project_project_id',
                    itemId: 'fmis_project_project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    width: 250,
                    forceSelection: false,
                    allowBlank: false,
                    readOnly: false,
                    enforceMaxLength: true,
                    queryMode: 'local',
                    rowdata: null,
                    matchFieldWidth: false,
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px">',
                            '<tr class="x-grid-row">',
                            '<th width="40px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Company</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{project_name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_prefix',
                    name: 'prefix',
                    fieldLabel: 'Prefix',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor: '-5',
                    enableKeyEvents: true,
                    absoluteReadOnly: true,
                     msgTarget: "side",
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Cash Flow',
                    itemId: 'fdms_is_cashflow',
                    name: 'is_cashflow',
                    checked: true,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Cashier',
                    itemId: 'fdms_is_cashier',
                    name: 'is_cashier',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
                 {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Print Journal',
                    itemId: 'fdms_is_printjournal',
                    name: 'is_printjournal',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Minority?',
                    itemId: 'fdms_is_printminority',
                    name: 'is_minority',
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
                },
//                {
//                    xtype: 'textfield',
//                    itemId: 'fdms_openmonth',
//                    name: 'openmonth',
//                    fieldLabel: 'Open Month',
//                    allowBlank: true,
//                    enforceMaxLength: true,
//                    maskRe: /[^\`\"\']/,
//                    maxLength: 2,
//                    anchor: '-5',
//                    enableKeyEvents: true
//                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        width: 75, iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});


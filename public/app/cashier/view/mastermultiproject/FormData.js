Ext.define('Cashier.view.mastermultiproject.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastermultiprojectformdata',
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
            items: [{
                    xtype: 'hiddenfield',
                    name: 'cheque_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'multiproject_id',
                    valueField: 'multiproject_id'
                },
                {
                    xtype: 'combobox',
                    name: 'user_user_id',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    forceSelection: true,
                    displayField: 'user_fullname',
                    valueField: 'user_id',
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                            '<th width="80px"><div class="x-column-header x-column-header-inner">Full Name</div></th>',
                            '<th width="100px"><div class="x-column-header x-column-header-inner">Email</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{user_fullname}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{user_email}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'combobox',
                    name: 'project_project_id',
                    fieldLabel: 'Project',
                    enforceMaxLength: true,
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'project_id',
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                            '<th width="15px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="100px"><div class="x-column-header x-column-header-inner">Project</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{name}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
                {
                    xtype: 'mastermultiprojectdetailgrid',
                    closable: false,
                    name: 'mastermultiprojectdetailgrid',
                    title: 'Detail Company ',
                    flex: 1,
                    itemId: 'tabDetailCompany',
                },
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


<?php

/**
 * Description of CoaConfigDao
 *
 * @author MIS
 */

require_once dirname(__DIR__) . '../library/Columnconfigreport.php';

class Cashier_Models_Dao_MasterprefixDao extends Cashier_Box_Models_App_AbDaoCashier implements Cashier_Box_Models_App_BlackHole {

    public function save( $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

        $row = 0;

        if (!$cs->getAddBy()) {
            return $row;
        }

        
        $unsetDetailforXml = array('detailpt');
        $row = $this->dbTable->SPUpdate('sp_prefix_create',
                $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml)
                );
       
        return $row;
    }

    public function update(Cashier_Models_Master_Prefix $cs, Cashier_Box_Models_App_HasilRequestRead $req) {

  
        $row = 0;
        if (!$cs->getId()) {
            return $row;
        }
            $unsetDetailforXml = array('detailpt');
            $row = $this->dbTable->SPUpdate('sp_prefix_update', 
                    $cs->getProject()->getId(),
                    $cs->getPt()->getId(),
                    $cs->getAddBy(),
                    $req->getXmlDataUnset($unsetDetailforXml)  
            );
      
        return $row;
    }

    public function getByProjectPtWithPageSearch(Cashier_Models_Master_Prefix $ct, Cashier_Box_Models_App_HasilRequestRead $request, $ses) {
        $hasil = array();
        $project = $ct->getProject()->getId();
        $pt = $ct->getPt()->getId();
        if ($project == 0 || $pt == 0) {
            return $hasil;
        }
        $ptId = (empty($request->getOthersValue("pt_id"))) ? $pt : $request->getOthersValue("pt_id");
        $hasil = $this->dbTable->SPExecute('sp_all_read', $request->getModeRead(), $request->getModule(), $ct->getProject()->getId(), intval($ptId), $request->getPage(), $request->getLimit(), $request->getXmlValue(), $ses->getProject()->getId(), $ses->getUser()->getId());

        return $hasil;
    }

    public function deleteData($user, $budgetdeletedId, Cashier_Box_Models_App_HasilRequestRead $req) {
        $row = 0;
        if (!$user) {
            return $row;
        }
        

        $row = $this->dbTable->SPUpdate('sp_all_destroy',
                $req->getModeRead(),
                $req->getModule(),
                intval($user),
                $budgetdeletedId);

        return $row;
    }

    public function codeExist($ft, Cashier_Box_Models_App_HasilRequestRead $request, $unique) {
        $hasil = 0;
        $data = json_decode($request->getOthers()['data'],true);        
        $hasil = $this->dbTable->SPExecute('sp_validator_read',
                $request->getModeRead(), 
                $request->getModule(),
                $ft->getProject()->getId(),
                $ft->getPt()->getId(),
                $data[$unique],
                $data['pt_pt_id'],
                $data['project_project_id']
                );

        return $hasil;
    }
    
    public function directDelete(Cashier_Box_Models_App_Decan $decan, Cashier_Box_Kouti_InterSession $session) {
        $row = 0;
        //$row = $this->dbTable->SPUpdate('sp_coa_config_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function exportdata(Cashier_Box_Models_App_HasilRequestRead $request, $ses)
    {
        $lib = new Columnconfigreport();

        $project_id = $request->getOthersValue('project_id');
        $pt_id = $request->getOthersValue('pt_id');

        $project_name = $this->dbTable->SPExecute('sp_all_read', 'getproject', 'global', $project_id, $pt_id, 0, 0, null, 0, 0);
        $project_name = $project_name[0][0]['name'];

        $pt_name = $this->dbTable->SPExecute('sp_all_read', 'getpt', 'global', $project_id, $pt_id, 0, 0, null, 0, 0);
        $pt_name = $pt_name[0][0]['name'];

        $lib->setSheetNumber(0);
        $lib->setTitleSheet('MASTER_PREFIX');
        $lib->setHeader(array('REPORT: ', 'MASTER PREFIX'));
        $lib->setHeader(array('PROJECT: ', $project_name));
        $lib->setHeader(array('PT: ', $pt_name));
        $lib->setHeader(array('PRINT BY: ', $request->getOthersValue('userprint')));
        $lib->setHeader(array('PRINT DATE: ', date('d-m-Y H:i:s')));
        $lib->setHeader(array('', ''));

        $lib->setBoldHeader(true);

        $lib->setSP("gl_2018.dbo.sp_export_masterprefix");
        $lib->setSPParam(array($project_id, $pt_id));

        $lib->setColumnTitle(array('Kode Prefix', 'Description', 'Cashflow', 'Cashier', 'Print Journal', 'Minority', 'Add On', 'Add By', 'Modify On', 'Modify By'));

        $lib->setConfig('prefix', 15);
        $lib->setConfig('description', 40);
        $lib->setConfig('is_cashflow', 12, 'center');
        $lib->setConfig('is_cashier', 12, 'center');
        $lib->setConfig('is_printjournal', 12, 'center');
        $lib->setConfig('is_minority', 12, 'center');
        $lib->setConfig('addon', 25, 'center');
        $lib->setConfig('addby', 25);
        $lib->setConfig('modion', 25, 'center');
        $lib->setConfig('modiby', 25);

        $lib->setBoldLastRow(false);

        $json = $lib->generateJSONConfig();

        $base_64 = base64_encode(json_encode($json));

        $base_64_file = 'base64_masterprefix_'.date('YmdHis').'.txt';

        if (!file_exists('app/gl/uploads/'.$base_64_file)) {
            file_put_contents('app/gl/uploads/'.$base_64_file, $base_64); 
        } 

        $filename = "exportprefix_".date('YmdHms').".xlsx";
        $path = APPLICATION_PATH . "/modules/cashier/models/python";
        // echo "python {$path}\General.py {$base_64} {$filename}"; exit;
        $output = exec("python {$path}/General.py {$base_64_file} {$filename}");
        $ptname = str_replace(' ', '_', $pt_name);
        $path = 'app/gl/uploads/'.$filename;
        $param['url'] = $path;

        unlink('app/gl/uploads/'.$base_64_file);

        return $param;
    }
}

?>

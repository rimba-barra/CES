<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of TopupwhatsappDao
 *
 * @author MIS
 */
class Erems_Models_Master_TopupwhatsappDao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
    /*@getByCPP
     * @params Erems_Models_Master_Topupwhatsapp
     */
    public function getAll(Erems_Box_Models_App_HasilRequestRead $request, Erems_Models_Topupwhatsapp $bt){
        $hasil = array();
        // $c = $bt->getCluster()->getId();$c = $c==999?0:$c;
        // $f = $bt->getFacilitiesType()->getId();$f = $f==999?0:$f;
        
        $hasil = $this->dbTable->SPExecute('sp_topupwhatsapp_read',
            $bt->getProject()->getId(),
            $bt->getPt()->getId(),
            $request->getPage(),
            $request->getLimit(),$bt->getUserFullname());
        return $hasil;
    }
    
    // public function getImages(Erems_Models_Master_TopupwhatsappImage $cf){
    //     $hasil = array();
        
    //     $hasil = $this->dbTable->SPExecute('sp_topupwhatsapp_read',$cf->getTopupwhatsapp()->getId());
    //     return $hasil;
    // }
    
    public function save(Erems_Models_Topupwhatsapp $pc){
        $hasil = 0;        

        $hasil = $this->dbTable->SPCreate('sp_topupwhatsapp_create',
            $pc->getProject()->getId(),
            $pc->getPt()->getId(),
            $pc->getTopupDate(),
            $pc->getNominal(),
            $pc->getUserID(),
            $pc->getImage()
        );

        return $hasil;
    }
    
    public function update(Erems_Models_Topupwhatsapp $pc){
        $hasil = 0;

        $hasil = $this->dbTable->SPUpdate('sp_topupwhatsapp_update',
            $pc->getProject()->getId(),
            $pc->getPt()->getId(),
            $pc->getId(),
            $pc->getTopupDate(),
            $pc->getNominal(),
            $pc->getUserID(),
            $pc->getImage()
        );
        
        return $hasil;
    }

    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;
        $row = $this->dbTable->SPUpdate('sp_topupwhatsapp_destroy', $decan->getString(), $session->getUserId());
        return $row;
    }

    public function approve_reject($params){
        $hasil = array();
        $return = array('success' => false);

        $hasil = $this->dbTable->SPExecute('sp_topupwhatsapp_approvereject', 
            $params['id'],
            $params['type'],
            $params['user_id']
        );

        $return['total'] = 0;
        $return['success'] = $hasil;
        
        return $return;
    }
    
    public function getSaldo(Erems_Models_Topupwhatsapp $tw){
        $hasil = array();

        $hasil = $this->dbTable->SPExecute('sp_whatsapp_view_saldo_read',substr($tw->getProject()->getId(),0,10),substr($tw->getPt()->getId(),0,10));

        return $hasil;
    }

    public function getAllExcel(Erems_Box_Models_App_HasilRequestRead $request, Erems_Models_Topupwhatsapp $bt){
        $hasil = array();
        // $c = $bt->getCluster()->getId();$c = $c==999?0:$c;
        // $f = $bt->getFacilitiesType()->getId();$f = $f==999?0:$f;
        
        $hasil = $this->dbTable->SPExecute('sp_topupwhatsapp_excel_read',
            $bt->getProject()->getId(),
            $bt->getPt()->getId(),
            $request->getPage(),
            $request->getLimit(),$bt->getUserFullname());
        return $hasil;
    }
    
    // public function codeExist(Erems_Models_Topupwhatsapp $ft){
    //     $hasil = 0;
    //     $hasil = $this->dbTable->SPExecute('sp_clusterfacilitiescodeexistb_read',$ft->getCode(),$ft->getProject()->getId(),$ft->getPt()->getId());
        
    //     return $hasil;
    // }
    
    //sp_projectfacilitiestcodeexist_read
}

?>

<?php

/**
 * Description of Dao
 *
 * @author RIZALDI-MIS
 */
class Erems_Models_Formorderijb_Dao extends Erems_Box_Models_App_AbDao implements Erems_Box_Models_App_BlackHole {
   
    
    public function getAll(Erems_Box_Models_App_HasilRequestRead $r,  Erems_Box_Models_App_Session $session = NULL){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_formorderijb_read',
                $session->getProject()->getId(),$session->getPt()->getId(),$r->getPage(),$r->getLimit(),$r->getOthersValue("unit_number"),
                $r->getOthersValue("customer_name")
                );
        return $hasil;
    }
    
    public function directDelete(\Erems_Box_Models_App_Decan $decan, \Erems_Box_Kouti_InterSession $session) {
        $row = 0;


        $ds = $decan->getString();
        $ids = explode("~", $ds);
	

        $row = $this->dbTable->SPUpdate('sp_formorderijb_destroy', $ds, $session->getUserId());
		
		
        return $row;
    }
    public function getOne($id){
        $hasil = array();
        $hasil = $this->dbTable->SPExecute('sp_formorderijbdetail_read',
                $id
                );
        return $hasil;
    }
    
   
    
    public function save(Erems_Models_Formorderijb_FormOrderIJB $fi){
        $hasil = 0;
        
        $hasil = $this->dbTable->SPUpdate('sp_formorderijb_create',
                $fi->getAddBy(),
                $fi->getProject()->getId(),
                $fi->getPt()->getId(),
                $fi->getPurchaseletter()->getId(),
                $fi->getFormorderijbNo(),
                $fi->getFormorderijbDate(),
                // $fi->getCustomerName(),
                // $fi->getCustomerAddress(),
                // $fi->getCustomerCity(),
                // $fi->getCustomerPhone(),
                // $fi->getCustomerFax(),
                // $fi->getCustomerEmail(),
				$fi->getPengalihanhakName(),
				$fi->getPengalihanhakAddress(),
				$fi->getPengalihanhakCity(),
				$fi->getPengalihanhakMobilephone(),
				$fi->getPengalihanhakFax(),
				$fi->getPengalihanhakEmail(),
				
                $fi->getBiayaSplitz(),
                $fi->getLandSizeType(),
                $fi->getIsLunas(),
                $fi->getIsSudahST(),
                $fi->getIsBiayaSplitz(),
                $fi->getIsTerbitshgb(),
                $fi->getShgbNo(),
                $fi->getShgbLuas(),
                $fi->getShgbKelurahan(),
                $fi->getIsPbb(),
                $fi->getPbbTahun(),
                $fi->getPbbNjop(),
                $fi->getPbbluasTanah(),
                $fi->getPbbluasBangunan(),
                $fi->getIsKtpSuami(),
                $fi->getIsKtpIstri(),
                $fi->getIsKsKKK(),
                $fi->getIsAktaKawin(),
                $fi->getIsNpwp(),
                $fi->getIsGantiNama(),
                $fi->getIsRetribusi(),
                $fi->getRetirbusiPeriode(),
                $fi->getIsSpt(),
                $fi->getIsSppjb(),
                $fi->getNote(),
                $fi->getPemberiName(),
                $fi->getPemberiJabatan(),
                $fi->getPemberiTelp(),
                $fi->getPenerimaName(),
                $fi->getPenerimaDate(),
                $fi->getKirimnotarisDate(),
                $fi->getKirimnotasiCPS(),
                $fi->getKirimnotarisPenerima(),
                $fi->getPosisiberkasCsDate(),
                $fi->getPosisiberkasbackofficeDate(),
                $fi->getPosisiberkascekfinanceDate(),
                $fi->getPosisiberkasambilsertifikatDate(),
                $fi->getPosisiberkaskirimnotarisDate(),
                $fi->getTglKirimNotaris(),
                $fi->getNamaNotaris(),
                $fi->getNoHgbHpl(),
                $fi->getNoIjbNoAkta(),
                //$fi->getLuasIjb(),
                $fi->getKeterangan(),
                $fi->getCatatan()
                );
      
       
        /*
       
        $hasil = $this->dbTable->SPUpdate('sp_blockb_create',$pc->getAddBy(),$pc->getProject()->getId(),
                $pc->getPt()->getId(),$pc->getCode(),$pc->getName(),$pc->getCluster()->getId(),$pc->getDescription());
        */
     
        return $hasil;
    }
    
    
    
    public function dataExist($projectId,$ptId,$no){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_formorderijbexist_read',$projectId,$ptId,$no);
        
        return $hasil;
    }
    
    public function dataExistbyUnit(Erems_Box_Models_Master_Project $projectId,Erems_Box_Models_Master_Pt $ptId,$id){
        $hasil = 0;
        $hasil = $this->dbTable->SPExecute('sp_formorderijbexistbyunit_read',$projectId->getId(),$ptId->getId(),$id);
        
        return $hasil;
    }
    
    public function update(Erems_Models_Formorderijb_FormOrderIJB $fi){
        $hasil = 0;
        
        if($fi->getId()==0){
            return 0;
        }
      
        $hasil = $this->dbTable->SPUpdate('sp_formorderijb_update',$fi->getAddBy(),
                $fi->getId(),
                $fi->getPurchaseletter()->getId(),
                $fi->getFormorderijbNo(),
                $fi->getFormorderijbDate(),
                // $fi->getCustomerName(),
                // $fi->getCustomerAddress(),
                // $fi->getCustomerCity(),
                // $fi->getCustomerPhone(),
                // $fi->getCustomerFax(),
                // $fi->getCustomerEmail(),
				$fi->getPengalihanhakName(),
				$fi->getPengalihanhakAddress(),
				$fi->getPengalihanhakCity(),
				$fi->getPengalihanhakMobilephone(),
				$fi->getPengalihanhakFax(),
				$fi->getPengalihanhakEmail(),
				
                $fi->getBiayaSplitz(),
                $fi->getLandSizeType(),
                $fi->getIsLunas(),
                $fi->getIsSudahST(),
                $fi->getIsBiayaSplitz(),
                $fi->getIsTerbitshgb(),
                $fi->getShgbNo(),
                $fi->getShgbLuas(),
                $fi->getShgbKelurahan(),
                $fi->getIsPbb(),
                $fi->getPbbTahun(),
                $fi->getPbbNjop(),
                $fi->getPbbluasTanah(),
                $fi->getPbbluasBangunan(),
                $fi->getIsKtpSuami(),
                $fi->getIsKtpIstri(),
                $fi->getIsKsKKK(),
                $fi->getIsAktaKawin(),
                $fi->getIsNpwp(),
                $fi->getIsGantiNama(),
                $fi->getIsRetribusi(),
                $fi->getRetirbusiPeriode(),
                $fi->getIsSpt(),
                $fi->getIsSppjb(),
                $fi->getNote(),
                $fi->getPemberiName(),
                $fi->getPemberiJabatan(),
                $fi->getPemberiTelp(),
                $fi->getPenerimaName(),
                $fi->getPenerimaDate(),
                $fi->getKirimnotarisDate(),
                $fi->getKirimnotasiCPS(),
                $fi->getKirimnotarisPenerima(),
                $fi->getPosisiberkasCsDate(),
                $fi->getPosisiberkasbackofficeDate(),
                $fi->getPosisiberkascekfinanceDate(),
                $fi->getPosisiberkasambilsertifikatDate(),
                $fi->getPosisiberkaskirimnotarisDate(),
                $fi->getTglKirimNotaris(),
                $fi->getNamaNotaris(),
                $fi->getNoHgbHpl(),
                $fi->getNoIjbNoAkta(),
                //$fi->getLuasIjb(),
                $fi->getKeterangan(),
                $fi->getCatatan()
                );
     
              
               //var_dump($this->dbTable);
        return $hasil;
    }

    public function getOneByUnit(Erems_Models_Unit_Unit $ut) {
        $hasil = array();
        if ($ut->getId() == 0) {
            return $hasil;
        }
        $hasil = $this->dbTable->SPExecute('sp_formorderijbdetailbyunit_read', $ut->getId());

        return $hasil;
    }

}

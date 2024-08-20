<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of PropertyInfo
 *
 * @author MIS
 */
class Cashier_Models_Unit_PropertyInfo implements Cashier_Box_Kouti_ObjectTable {
    private $landSize;
    private $buildingSize;
    private $kelebihanTanah;
    private $long;
    private $width;
    private $floor;
    private $floorSize;
    private $bedRoom;
    private $bathRoom;
    private $electricity;
    private $depan;
    private $samping;
    private $belakang;
    private $konsepdasar;
    private $isHookCalculated;
    private $isTamanCalculated;
    
    public function getLandSize() {
        return $this->landSize;
    }

    public function setLandSize($landSize) {
        $this->landSize = (double)$landSize;
    }

    public function getBuildingSize() {
        return (float)$this->buildingSize;
    }

    public function setBuildingSize($buildingSize) {
        $this->buildingSize = (double)$buildingSize;
    }

    public function getKelebihanTanah() {
        return (float)$this->kelebihanTanah;
    }

    public function setKelebihanTanah($kelebihanTanah) {
        $this->kelebihanTanah = $kelebihanTanah;
    }

    public function getLong() {
        return (float)$this->long;
    }

    public function setLong($long) {
        $this->long = $long;
    }

    public function getWidth() {
        return (float)$this->width;
    }

    public function setWidth($width) {
        $this->width = $width;
    }

    public function getFloor() {
        return (int)$this->floor;
    }

    public function setFloor($floor) {
        $this->floor = (int)$floor;
    }
    
    public function getFloorSize() {
        return (float)$this->floorSize;
    }

    public function setFloorSize($floorSize) {
        $this->floorSize = (double)$floorSize;
    }

    public function getBedRoom() {
        return (int)$this->bedRoom;
    }

    public function setBedRoom($bedRoom) {
        $this->bedRoom = (int)$bedRoom;
    }

    public function getBathRoom() {
        return (int)$this->bathRoom;
    }

    public function setBathRoom($bathRoom) {
        $this->bathRoom = (int)$bathRoom;
    }

    public function getElectricity() {
        return (float)$this->electricity;
    }

    public function setElectricity($electricity) {
        $this->electricity = (double)$electricity;
    }
    
    public function getDepan() {
        return (float)$this->depan;
    }

    public function setDepan($depan) {
        $this->depan = $depan;
    }

    public function getSamping() {
        return (float)$this->samping;
    }

    public function setSamping($samping) {
        $this->samping = $samping;
    }

    public function getBelakang() {
        return (float)$this->belakang;
    }

    public function setBelakang($belakang) {
        $this->belakang = $belakang;
    }

    public function getKonsepdasar() {
        return (int)$this->konsepdasar;
    }

    public function setKonsepdasar($konsepdasar) {
        $this->konsepdasar = $konsepdasar;
    }
    
    public function getIsHookCalculated() {
        return (int)$this->isHookCalculated;
    }

    public function setIsHookCalculated($isHookCalculated) {
        $this->isHookCalculated = $isHookCalculated;
    }

    public function getIsTamanCalculated() {
        return (int)$this->isTamanCalculated;
    }

    public function setIsTamanCalculated($isTamanCalculated) {
        $this->isTamanCalculated = $isTamanCalculated;
    }

    
    
    
    public function setArrayTable($dataArray = NULL) {
        $x = $dataArray==NULL?$this->getArrayTable():$dataArray;
        if(isset ($x['land_size'])){
           $this->setLandSize($x['land_size']); 
           
        }
        if(isset ($x['building_size'])){
           $this->setBuildingSize($x['building_size']); 
        }
        if(isset ($x['floor_size'])){
           $this->setFloorSize($x['floor_size']); 
        }
        if(isset ($x['floor'])){
           $this->setFloor($x['floor']); 
        }
        if(isset ($x['bedroom'])){
           $this->setBedRoom($x['bedroom']); 
        }
        if(isset ($x['bathroom'])){
           $this->setBathRoom($x['bathroom']); 
        }
        if(isset ($x['electricity'])){
           $this->setElectricity($x['electricity']); 
        }
        if(isset ($x['width'])){
           $this->setWidth($x['width']); 
        }
        if(isset ($x['long'])){
           $this->setLong($x['long']); 
        }
        if(isset ($x['kelebihan'])){
           $this->setKelebihanTanah($x['kelebihan']); 
        }
        if(isset ($x['depan'])){
           $this->setDepan($x['depan']); 
        }
        if(isset ($x['belakang'])){
           $this->setBelakang($x['belakang']); 
        }
        if(isset ($x['samping'])){
           $this->setSamping($x['samping']); 
        }
        if(isset ($x['konsepdasar'])){
           $this->setKonsepdasar($x['konsepdasar']); 
        }
        if(isset ($x['is_hookcalculated'])){
           $this->setIsHookCalculated($x['is_hookcalculated']); 
        }
        if(isset ($x['is_tamancalculated'])){
           $this->setIsTamanCalculated($x['is_tamancalculated']); 
        }
       
        unset($x);
    }
    
    public function getArrayTable() {
        $x = array(
            'land_size'=>$this->getLandSize(),
            'building_size'=>$this->getBuildingSize(),
            'floor_size'=>$this->getFloorSize(),
            'floor'=>$this->getFloor(),
            'bedroom'=>$this->getBedRoom(),
            'bathroom'=>$this->getBathRoom(),
            'electricity'=>$this->getElectricity(),
            'width'=>$this->getWidth(),
            'long'=>$this->getLong(),
            'kelebihan'=>$this->getKelebihanTanah(),
            'depan'=>$this->getDepan(),
            'belakang'=>$this->getBelakang(),
            'samping'=>$this->getSamping(),
            'konsepdasar'=>$this->getKonsepdasar(),
            'is_hookcalculated'=>$this->getIsHookCalculated(),
            'is_tamancalculated'=>$this->getIsTamanCalculated()
            
        );
        
        return $x;
    }


    
    
}

?>

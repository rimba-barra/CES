<?php

/**
 * Description of UnitSize
 *
 * @author MIS
 */
class Erems_Models_Master_UnitSize extends Erems_Models_Master_Unit{
    private $land;
    private $building;
    private $floor;
    private $bedRoom;
    private $bathRoom;
    private $electricity;
    private $width;
    private $long;
    private $kelebihan;
    
    public function getLand() {
        return $this->land;
    }

    public function setLand($land) {
        $this->land = $land;
    }

    public function getBuilding() {
        return $this->building;
    }

    public function setBuilding($building) {
        $this->building = $building;
    }

    public function getFloor() {
        return $this->floor;
    }

    public function setFloor($floor) {
        $this->floor = $floor;
    }

    public function getBedRoom() {
        return $this->bedRoom;
    }

    public function setBedRoom($bedRoom) {
        $this->bedRoom = $bedRoom;
    }

    public function getBathRoom() {
        return $this->bathRoom;
    }

    public function setBathRoom($bathRoom) {
        $this->bathRoom = $bathRoom;
    }

    public function getElectricity() {
        return $this->electricity;
    }

    public function setElectricity($electricity) {
        $this->electricity = $electricity;
    }

    public function getWidth() {
        return $this->width;
    }

    public function setWidth($width) {
        $this->width = $width;
    }

    public function getLong() {
        return $this->long;
    }

    public function setLong($long) {
        $this->long = $long;
    }

    public function getKelebihan() {
        return $this->kelebihan;
    }

    public function setKelebihan($kelebihan) {
        $this->kelebihan = $kelebihan;
    }
    
    public function setArrayTable($dataArray = NULL) {
        parent::setArrayTable($dataArray);
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        if(isset ($x['land_size'])){
           $this->setLand($x['land_size']); 
        }
        if(isset ($x['building_size'])){
           $this->setBuilding($x['building_size']); 
        }
        if(isset ($x['floor_size'])){
           $this->setFloor($x['floor_size']); 
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
           $this->setKelebihan($x['kelebihan']); 
        }
        
        unset($x);
    }
    
    public function getArrayTable() {
        $x = parent::getArrayTable();
        $y = array(
            'land_size'=>$this->getLand(),
            'building_size'=>$this->getBuilding(),
            'floor_size'=>$this->getFloor(),
            'bedroom'=>$this->getBedRoom(),
            'bathroom'=>$this->getBathRoom(),
            'electricity'=>$this->getElectricity(),
            'width'=>$this->getWidth(),
            'long'=>$this->getLong(),
            'kelebihan'=>$this->getKelebihan()
            
        );
        $x = array_merge($x,$y);
        return $x;
    }


}

?>

<?php

interface Erems_Models_CommonQuery{
    public abstract function save($data);
    public abstract function getAll();
    public abstract function update($data);
    public abstract function getById($id);
}
?>

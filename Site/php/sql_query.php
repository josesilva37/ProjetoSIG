<?php

require_once 'conexao.php';

class SQL_Query{

	public static function _select($sqlquery,$parametros){
		// echo json_encode($parametros);
		Global $pdo;
		
		try {

			$statement = $pdo->prepare($sqlquery);
			$statement->execute($parametros);
			$resultado = $statement->fetchAll(PDO::FETCH_ASSOC);

			return $resultado;

		} catch (\PDOException $e) {
			die($e->getMessage());
		}

	}

	public static function _insert($sqlquery,$parametros){
		// echo json_encode($parametros);
		Global $pdo;
		
		try {

			$statement = $pdo->prepare($sqlquery);
			$statement->execute($parametros);
			return $pdo->lastInsertId();


		} catch (\PDOException $e) {
			die($e->getMessage());
		}

	}
}
?>
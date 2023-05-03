<?php

namespace App\Repository;
use App\Entity\User;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function verifLogin($data, $error)
    {
        if (!isset($data['email']) || strlen($data['email']) >= 254 || strlen($data['email']) <= 1) {
            array_push($error, 'L\'email est incorrect');
        }
    
        if (!isset($data['password']) || strlen($data['password']) >= 254 || strlen($data['password']) <= 1) {
            array_push($error, 'Le mot de passe est incorrect');
        }
    
        if (count($error) > 0) {
            return [
                'error' => true,
                'message' => $error[0]
            ];
        }
    
        $user = $this->findBy(['email' => $data['email']]);
        if (count($user) < 1) {
            return [
                'error' => true,
                'message' => "Aucun utilisateur trouvé"
            ];
        }
    
        if (password_verify($data['password'], $user[0]->getPassword())) {
            return [
                'error' => false,
                'message' => 'L\'utilisateur a bien été trouvé'
            ];
        }
    
        return [
            'error' => true,
            'message' => "Mot de passe incorrect"
        ];
    }
    
public function JWTEncode($data){

    $key = $_ENV['ENV_JWT'];
    $payload = [
        'exp' => time()+(60*60*7),
        'email' => $data['email'],
        'fistname' => $data['firstname'],
        'lastname' => $data['lastname']
    ];
    
    return JWT::encode($payload, $key, 'HS256');
  
}

public function JWTDecode($jwt){
   
    $key = $_ENV['ENV_JWT'];
    try{
        return JWT::decode($jwt, new Key ($key, 'HS256'));

    }catch(ExpiredException $e){
return [
    'error' => true,
    'message' => 'token invalide'
];
    }
    
}

 private function verif($data, $error) {
    if (!isset($data['firstname']) || strlen($data['firstname']) >= 254 || strlen($data['firstname']) <= 1) {
        array_push($error, 'Le nom est incorrecte');
    }

    if (!isset($data['lastname']) || strlen($data['lastname']) >= 254 || strlen($data['lastname']) <= 1) {
        array_push($error, 'Le prenom est incorrecte');
    }

    if (!isset($data['email']) || strlen($data['email']) >= 254 || strlen($data['email']) <= 1) {
        array_push($error, 'Le email est incorrecte');
    }

    if (!isset($data['password']) || strlen($data['password']) >= 254 || strlen($data['password']) <= 1) {
        array_push($error, 'Le password est incorrecte');
    }

    if (!isset($data['confirmPassword']) || strlen($data['confirmPassword']) >= 254 || strlen($data['confirmPassword']) <= 1) {
        array_push($error, 'Le confirmPassword est incorrecte');
    }

    if ($data['password'] !== $data['confirmPassword']) {
        array_push($error, 'Le password est incorrecte');
    }

    return $error;
}

public function save($data, $error)
{$error = $this->verif($data, $error);

    $jwt = $this->JWTEncode($data);

    if (count($error) > 0) {
        return [
            'error' => true,
            'message' => $error[0]
        ];
    }

    $email = $this->findBy(['email' => $data['email']]);

    if (count($email) > 0) {
        return [
            'error' => true,
            'message' => "L'utilisateur est déjà inscrit"
        ];
    }

    $hash = password_hash($data['password'], PASSWORD_ARGON2I);

    $user = new User();
    $user->setFirstname($data['firstname']);
    $user->setLastname($data['lastname']);
    $user->setEmail($data['email']);
    $user->setPassword($hash);

    $this->getEntityManager()->persist($user);
    $this->getEntityManager()->flush();

    return [
        'error' => false, 
        'jwt' => $jwt,
        'message' => 'Votre utilisateur a bien été enregistrer'
    ];
}

public function auth($data, $error)
{
    if (!isset($data['email']) || strlen($data['email']) >= 254 || strlen($data['email']) <= 1) {
        array_push($error, 'L\'email est incorrect');
    }

    if (!isset($data['password']) || strlen($data['password']) >= 254 || strlen($data['password']) <= 1) {
        array_push($error, 'Le mot de passe est incorrect');
    }

    if (count($error) > 0) {
        return [
            'error' => true,
            'message' => $error[0]
        ];
    }

    $email = $this->findBy(['email' => $data['email']]);

    if (count($email) === 0) {
        return [
            'error' => true,
            'message' => "Email/mot de passe incorrect"
        ];
    }

    $hashedPassword = $email[0]->getPassword();
    if (!password_verify($data['password'], $hashedPassword)) {
        return [
            'error' => true,
            'message' => "Email/mot de passe incorrect"
        ];
    }

    $jwt = $this->JWTEncode([
        'email' => $email[0]->getEmail(),
        'firstname' => $email[0]->getFirstname(),
        'lastname' => $email[0]->getLastname(),
    ]);
    return [
        'error' => false, 
        'jwt' => $jwt,
        'message' => 'Vous êtes connecté'
    ];
}



}

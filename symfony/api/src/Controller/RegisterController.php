<?php 
namespace App\Controller;

// ...

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RegisterController extends AbstractController
{
    private $userRepository;
    private $entityManager;

    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    #[Route('/register', methods: ['POST'])]
    public function Response(Request $request): Response
    {
        // j'appel mes données
        $firstname = $request->request->get('firstname');
        $lastname = $request->request->get('lastname');
        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $confirmPassword = $request->request->get('confirmPassword');

        // je traite mes données
        $error = $this->userRepository->save([
            'firstname' => $firstname,
            'lastname' => $lastname,
            'email' => $email,
            'password' => $password,
            'confirmPassword' => $confirmPassword,
        ], []);

        // j'enregistre mes données
        $response = new Response();

        if ($error['error'] == true) {
            $response->setContent(json_encode([
                'data' => [
                    'titleError' => 'Une erreur est survenue',
                    'error' => $error['message']
                ],
            ]));
            $response->setStatusCode(409);
    
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }


        $response->setContent(json_encode([
            'data' => [
                'firstname' => $firstname,
                'lastname' => $lastname,
                'email' => $email,
                'password' => $password,
                'confirmPassword' => $confirmPassword,
                'jwt' => $error['jwt']
            ],
        ]));
        $response->setStatusCode(200);


        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}

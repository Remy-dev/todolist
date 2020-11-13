<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\Task;
use App\Form\TaskType;
use App\Repository\CategoryRepository;
use App\Repository\TaskRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    /**
     * @Route("/api/tasks", name="task_list", methods={"GET"})
     */
    public function index(TaskRepository $taskRepository, Request $request): Response
    {
        $list = $taskRepository->findAll();

        return $this->json(
            $list,
            200,
            [],
            ["groups" => ["task:read"]]
        );
    }

    /**
     * @Route ("/api/tasks/create", name="task_create")
     */
    public function create(TaskRepository $taskRepository, CategoryRepository $categoryRepository, Request $request): Response
    {
        $task = new Task;

        if($request->getMethod() == 'POST')
        {
            $datas = json_decode($request->getContent(), true);

            $category = $categoryRepository->find($datas['categoryId']);
            $task->setTitle($datas['title']);
            $task->setCategory($category);
            $task->setStatus(1);
            $task->setCompletion(0);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($task);
            $entityManager->flush();

            $this->addFlash(
                'success',
                'La tâche a bien été sauvegardée'
            );

            return new Response('',
                Response::HTTP_CREATED,
            );
        }


        return new Response(
            '',
            Response::HTTP_BAD_REQUEST
        );

    }
}

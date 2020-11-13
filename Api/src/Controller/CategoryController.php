<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoryController extends AbstractController
{
    /**
     * @Route("/api/categories", name="api_category_list")
     */
    public function index(CategoryRepository $categoryRepository, Request $request): Response
    {
        $list = $categoryRepository->findAll();

        return $this->json(
            $list,
            200,
            [],
            ["groups" => ["category:list"]]

        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Obter o nome do arquivo do cabeçalho
    const fileName = request.headers.get('x-file-name');
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'Nome do arquivo não fornecido' },
        { status: 400 }
      );
    }

    // Ler o arquivo enviado
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      );
    }

    // Converter o arquivo para um buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Criar o caminho para salvar o arquivo
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(imagesDirectory, fileName);

    // Salvar o arquivo
    await writeFile(filePath, buffer);

    // Retornar a URL da imagem
    const imageUrl = `${process.env.NEXT_PUBLIC_SIEHP_URL}/images/${fileName}`;

    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Erro ao processar upload:', error);
    return NextResponse.json(
      { error: 'Falha ao processar o upload da imagem' },
      { status: 500 }
    );
  }
} 
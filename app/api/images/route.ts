import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getDbAndReqBody } from '@/lib/utils/api-routes';

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);
    const url = new URL(req.url);
    const imgId = url.searchParams.get('id');

    if (!imgId) {
      return NextResponse.json({ error: 'Image ID not provided' }, { status: 400 });
    }

    const image = await db.collection('images').findOne({ imgId });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const base64Data = image.dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const extension = image.title.split('.').pop();
    const mimeType = extension === 'jpg' ? 'jpeg' : extension;

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': `image/${mimeType}`,
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

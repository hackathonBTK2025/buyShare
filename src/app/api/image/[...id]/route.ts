
import {NextRequest, NextResponse} from 'next/server';
import {generateImage} from '@/ai/flows/image-generation';

export const GET = async (
  req: NextRequest,
  {params}: {params: {id: string[]}}
) => {
  const imageId = params.id.join('/');
  const {searchParams} = new URL(req.url);
  const prompt = searchParams.get('prompt');

  if (!prompt) {
    return NextResponse.json(
      {error: 'A prompt must be provided.'},
      {status: 400}
    );
  }

  const result = await generateImage(prompt);
  const b64 = result.replace('data:image/png;base64,', '');

  return new NextResponse(Buffer.from(b64, 'base64'), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
};

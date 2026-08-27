import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const projectUrl = new URL('../', import.meta.url);

test('Given the booth page, when a visitor opens it, then the video is ready for mobile playback', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /<html lang="ko">/);
  assert.match(pageSource, /<video/);
  assert.match(pageSource, /controls/);
  assert.match(pageSource, /playsinline/);
  assert.match(pageSource, /media\/booth-intro\.mp4/);
  assert.match(pageSource, /<h1 id="page-title">광장 무한 상사<\/h1>/);
  assert.match(pageSource, /media\/gwangjang-muhan-sangsa\.png/);
  assert.match(pageSource, /alt="우리의 전도를 다시 ON 행사 홍보 이미지"/);
});

test('Given a QR visitor, when the page loads, then it asks for no login or personal information', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.doesNotMatch(pageSource, /<form/);
  assert.doesNotMatch(pageSource, /<input/);
  assert.match(pageSource, /개인정보 입력 없이/);
});

test('Given the public page, when its link is shared, then social metadata uses the deployed URL', async () => {
  const pageSource = await readFile(new URL('index.html', projectUrl), 'utf8');

  assert.match(pageSource, /property="og:title" content="광장 무한 상사"/);
  assert.match(pageSource, /https:\/\/wjddn144-ctrl\.github\.io\/booth-video-qr\//);
  assert.match(pageSource, /media\/gwangjang-muhan-sangsa\.png/);
});

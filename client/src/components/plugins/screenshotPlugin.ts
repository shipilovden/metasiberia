// screenshotPlugin.ts
export function screenshotPlugin() {
  try {
    const canvas = document.querySelector('canvas');
    if (!canvas) throw new Error('Канвас не найден');

    // ⏳ Подождать перед сохранением, чтобы рендер точно завершился
    setTimeout(() => {
      // ✅ Используем toBlob для надёжности
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Не удалось получить изображение с canvas');
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `screenshot-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);

        console.log('[ScreenshotPlugin] Скриншот сохранён');
      }, 'image/png');
    }, 100); // Можно увеличить до 200, если будет нужно
  } catch (err) {
    console.error('[ScreenshotPlugin] Ошибка:', err);
    alert('Не удалось сохранить скриншот.');
  }
}

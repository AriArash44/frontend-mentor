import { ShowToastService } from './show-toast.service';

describe('ShowToastService', () => {
  it('should call Toastify with the correct config and then showToast()', () => {
    const showSpy = jasmine.createSpy('showToast');
    const toastifySpy= jasmine.createSpy('Toastify').and.returnValue({ showToast: showSpy });
    const svc = new ShowToastService();
    (svc as any).toastify = toastifySpy;
    svc.show('Hello world!');

    expect(toastifySpy).toHaveBeenCalledWith(jasmine.objectContaining({
      text: 'Hello world!',
      duration: 2000,
      newWindow: true,
      close: false,
      gravity: 'top',
      position: 'left',
      stopOnFocus: true,
      style: jasmine.objectContaining({
        background: '#FFFFFF',
        border: '1px solid #FF0000',
        color: '#FF0000',
        direction: 'rtl',
        'border-radius': '5px'
      })
    }));
    expect(showSpy).toHaveBeenCalled();
  });
});

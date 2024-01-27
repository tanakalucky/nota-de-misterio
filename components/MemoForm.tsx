'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    players: z
      .string({
        required_error: 'プレイヤー数は必須項目です',
      })
      .min(1, { message: 'プレイヤー数は必須項目です' })
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
          return parsed;
        }

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '数字ではありません',
        });
        return z.NEVER;
      })
      .refine((val) => val > 0, { message: '1以上の整数を入力してください' }),
    days: z
      .string({
        required_error: '日数は必須項目です',
      })
      .min(1, { message: '日数は必須項目です' })
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
          return parsed;
        }

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '数字ではありません',
        });
        return z.NEVER;
      })
      .refine((val) => val > 0, { message: '1以上の整数を入力してください' }),
    startTime: z
      .string({
        required_error: '開始時刻は必須項目です',
      })
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
          return parsed;
        }

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '数字ではありません',
        });
        return z.NEVER;
      }),
    endTime: z
      .string({
        required_error: '終了時刻は必須項目です',
      })
      .transform((val, ctx) => {
        const parsed = parseInt(val);
        if (!isNaN(parsed)) {
          return parsed;
        }

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '数字ではありません',
        });
        return z.NEVER;
      }),
    intervalTime: z.string({ required_error: '時間間隔は必須項目です' }).transform((val, ctx) => {
      const parsed = parseInt(val);
      if (!isNaN(parsed)) {
        return parsed;
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '数字ではありません',
      });
      return z.NEVER;
    }),
  })
  .refine(
    (data) => {
      const { days, startTime, endTime } = data;
      if (days !== 1) return true;
      return startTime < endTime;
    },
    { message: '日数が1の場合は、終了時刻を開始時刻より大きくしてください', path: ['endTime'] },
  );

type OptionType = {
  value: string;
  label: string;
};

const TIMES: OptionType[] = (() => {
  const times: OptionType[] = [];

  times.push({ value: '5', label: '5分' });
  times.push({ value: '10', label: '10分' });
  times.push({ value: '30', label: '30分' });
  times.push({ value: '60', label: '60分' });

  return times;
})();

export default function MemoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const params = new URLSearchParams({
      players: values.players.toString(),
      days: values.days.toString(),
      startTime: values.startTime.toString(),
      endTime: values.endTime.toString(),
      intervalTime: values.intervalTime.toString(),
    });

    router.push(`/memo?${params.toString()}`);
  };

  const HOURS: OptionType[] = (() => {
    const hours: OptionType[] = [];

    for (let i = 0; i < 24; i++) {
      const hour = `${i.toString().padStart(2, '0')}:00`;
      hours.push({ value: i.toString(), label: hour });
    }

    return hours;
  })();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-[90%] md:w-[50%] lg:w-[30%] space-y-2 md:space-y-3 lg:space-y-4 '
      >
        <FormField
          control={form.control}
          name='players'
          render={({ field }) => (
            <FormItem>
              <FormLabel>プレイヤー数</FormLabel>
              <FormControl>
                <Input placeholder='プレイヤー数を入力してください' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='days'
          render={({ field }) => (
            <FormItem>
              <FormLabel>日数</FormLabel>
              <FormControl>
                <Input placeholder='日数を入力してください' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>開始時刻</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='開始時刻' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HOURS.map((hour) => (
                      <SelectItem value={`${hour.value}`} key={`startTime:${hour.label}`}>
                        {hour.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>終了時刻</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='終了時刻' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {HOURS.map((hour) => (
                      <SelectItem value={`${hour.value}`} key={`endTime:${hour.label}`}>
                        {hour.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='intervalTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>時間間隔</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='時間間隔' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIMES.map((time) => (
                      <SelectItem value={`${time.value}`} key={`intervalTime:${time.label}`}>
                        {time.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>作成</Button>
      </form>
    </Form>
  );
}

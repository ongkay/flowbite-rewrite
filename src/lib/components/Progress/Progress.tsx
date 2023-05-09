import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { useId } from 'react';
import type { DeepPartial } from '..';
import { mergeDeep } from '../../helpers/mergeDeep';
import type { FlowbiteColors, FlowbiteSizes } from '../Flowbite/FlowbiteTheme';
import { useTheme } from '../Flowbite/ThemeContext';

export interface FlowbiteProgressTheme {
  base: string;
  label: string;
  bar: string;
  color: ProgressColor;
  size: ProgressSizes;
}

export interface ProgressColor
  extends Pick<
    FlowbiteColors,
    'dark' | 'blue' | 'red' | 'green' | 'yellow' | 'indigo' | 'purple'
  > {
  [key: string]: string;
}

export interface ProgressSizes extends Pick<FlowbiteSizes, 'sm' | 'md' | 'lg' | 'xl'> {
  [key: string]: string;
}

export interface ProgressProps extends PropsWithChildren, ComponentProps<'div'> {
  size?: keyof ProgressSizes;
  label?: string;
  labelPosition?: 'inside' | 'outside' | 'none';
  labelProgress?: boolean;
  progress: number;
  theme?: DeepPartial<FlowbiteProgressTheme>;
}

export const Progress: FC<ProgressProps> = ({
  className,
  color = 'blue',
  label = 'progressbar',
  labelPosition = 'none',
  labelProgress = false,
  progress,
  size = 'md',
  theme: customTheme = {},
  ...props
}) => {
  const id = useId();
  const theme = mergeDeep(useTheme().theme.progress, customTheme);

  return (
    <>
      <div
        aria-label={label}
        aria-valuenow={progress}
        id={id}
        role="progressbar"
        {...props}
      >
        {label && labelPosition === 'outside' && (
          <div className={theme.label}>
            <span>{label}</span>
            {labelProgress && <span>{progress}%</span>}
          </div>
        )}
        <div className={classNames(theme.base, theme.size[size], className)}>
          <div
            style={{ width: `${progress}%` }}
            className={classNames(theme.bar, theme.color[color], theme.size[size])}
          >
            {label && labelPosition === 'inside' && label}
          </div>
        </div>
      </div>
    </>
  );
};
